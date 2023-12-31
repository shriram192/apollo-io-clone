import axios from "axios";

const BASE_URL = "https://apollo-io-clone.onrender.com";

const SEARCH_PATH = "/search";
const TAG_LOCATION_PATH = "/tag/location";
const TAG_ORGANIZATION_PATH = "/tag/organization";
const SEARCH_SNIPPETS_PATH = "/search/snippet";

export const searchPeople = async (
  name,
  locations,
  companies,
  page,
  per_page
) => {
  const body = {
    q_person_name: name,
    display_mode: "explorer_mode",
    ui_finder_random_seed: "bhju00f1fea",
    page,
    per_page,
  };

  if (locations.length > 0) {
    body.person_locations = locations.map((item) => item.value);
  }

  if (companies.length > 0) {
    body.organization_ids = companies.map((item) => item.key);
  }

  console.log("Body: ", body);

  if (
    !(
      body.hasOwnProperty("q_person_name") ||
      body.hasOwnProperty("person_locations") ||
      body.hasOwnProperty("organization_ids")
    )
  ) {
    return {
      success: false,
      message: "Invalid Input from application stopped at client!",
    };
  }

  try {
    const result = await axios.post(BASE_URL + SEARCH_PATH, body);

    if (result.status === 200) {
      let output = [];
      const { people, contacts, pagination } = result.data.data;

      people.forEach((item) => {
        output.push({
          id: item.id,
          name:
            item.name !== null && item.city !== undefined
              ? item.name
              : "Unknown",
          title:
            item.title !== null && item.title !== undefined
              ? item.title
              : "Unknown",
          company:
            item.organization &&
            item.organization.name !== null &&
            item.organization.name !== undefined
              ? item.organization.name
              : "Unknown",
          contactLocation:
            item.city !== null && item.city !== undefined
              ? item.city + ", " + item.state
              : "Unknown",
          companyId: item.organization_id,
          email:
            item.email !== null && item.email !== undefined
              ? item.email
              : "Unknown",
        });
      });

      contacts.forEach((item) => {
        output.push({
          id: item.id,
          name:
            item.name !== null && item.name !== undefined
              ? item.name
              : "Unknwon",
          title:
            item.title !== null && item.name !== undefined
              ? item.title
              : "Unknown",
          company:
            item.organization &&
            item.organization.name !== null &&
            item.organization.name !== undefined
              ? item.organization.name
              : "Unknown",
          contactLocation:
            item.city !== null && item.city !== undefined
              ? item.city + ", " + item.state
              : "Unknown",
          companyId: item.organization_id,
          email:
            item?.email !== null && item.email !== undefined
              ? item.email
              : "Unknown",
        });
      });

      const org_data = await searchOrgSnippets(
        output.map((item) => item.companyId)
      );

      if (org_data.success) {
        output = output.map((item) => {
          const orgItem = org_data.data.data.organizations.find(
            (orgItem) => item.companyId === orgItem.id
          );
          return {
            ...item,
            industry:
              orgItem.industry !== null && orgItem.industry !== undefined
                ? orgItem.industry
                : "Unknown",
            keywords: orgItem.keywords.toString(),
            employee_no:
              orgItem.estimated_num_employees !== null &&
              orgItem.estimated_num_employees !== undefined
                ? orgItem.estimated_num_employees
                : "Unknown",
          };
        });
      }

      return {
        success: true,
        data: output,
        pagination,
      };
    }
    return {
      success: false,
      message: "Failed to Search Data!",
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Failed to Search Data!",
    };
  }
};

export const getLocationTags = async (location) => {
  const params = {
    q_tag_fuzzy_name: location,
    kind: "location",
    display_mode: "fuzzy_select_mode",
  };

  if (
    !(
      params.hasOwnProperty("q_tag_fuzzy_name") && params.hasOwnProperty("kind")
    )
  ) {
    return {
      success: false,
      message: "Invalid Input from application stopped at client!",
    };
  }

  try {
    const result = await axios.get(BASE_URL + TAG_LOCATION_PATH, { params });
    if (result.status === 200) {
      return {
        success: true,
        data: result.data.data.tags.map(({ id, cleaned_name }) => {
          return {
            key: id,
            label: cleaned_name,
            value: cleaned_name,
          };
        }),
      };
    } else {
      return {
        success: false,
        data: ["Unable to get Location Tags"],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: ["Unable to get Location Tags"],
    };
  }
};

export const getOrganizationTags = async (company) => {
  const body = {
    q_organization_fuzzy_name: company,
    display_mode: "fuzzy_select_mode",
    ui_finder_random_seed: "bhju00f1fea",
  };

  if (!body.hasOwnProperty("q_organization_fuzzy_name")) {
    return {
      success: false,
      message: "Invalid Application Input, Stopped at Client!",
    };
  }
  try {
    const result = await axios.post(BASE_URL + TAG_ORGANIZATION_PATH, body);
    if (result.status === 200) {
      return {
        success: true,
        data: result.data.data.organizations.map(
          ({ id, logo_url, name, domain }) => {
            return {
              key: id,
              value: name,
              label: name,
              logo_url,
              domain,
            };
          }
        ),
      };
    }
    return {
      success: false,
      data: ["Failed to get Organization Tag Data!"],
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: ["Failed to get Organization Tag Data!"],
    };
  }
};

export const searchOrgSnippets = async (ids) => {
  const body = {
    ids,
  };

  if (!body.hasOwnProperty("ids")) {
    return {
      success: false,
      message: "Invalid Application Input! Stopped at Client!",
    };
  }

  try {
    const result = await axios.post(BASE_URL + SEARCH_SNIPPETS_PATH, body);

    if (result.status === 200) {
      return {
        success: true,
        data: result.data,
      };
    }
    return {
      success: false,
      message: "Failed to get Organization Snippets Data!",
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Failed to get Organization Snippets Data!",
    };
  }
};
