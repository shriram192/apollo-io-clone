import axios from "axios";

const BASE_URL = "http://localhost:8000";

const SEARCH_PATH = "/search";
const TAG_LOCATION_PATH = "/tag/location";
const TAG_ORGANIZATION_PATH = "/tag/organization";
const SEARCH_SNIPPETS_PATH = "/search/snippet";

export const searchPeople = async (name, locations, companies) => {
  console.log(name, locations, companies);

  const body = {
    q_person_name: name,
    display_mode: "explorer_mode",
    ui_finder_random_seed: "bhju00f1fea",
    context: "people-index-page",
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
      const { people, contacts } = result.data.data;

      people.forEach((item) => {
        output.push({
          id: item.id,
          name: item.name !== null ? item.name : "Unknown",
          title: item.title !== null ? item.title : "Unknown",
          company:
            item.organization && item.organization.name !== null
              ? item.organization.name
              : "Unknown",
          contactLocation:
            item.city !== null ? item.city + ", " + item.state : "Unknown",
          companyId: item.organization_id,
          employee_no: 0,
          email: item.email !== null ? item.email : "Unknown",
          industry: "",
          keywords: "",
        });
      });

      contacts.forEach((item) => {
        output.push({
          id: item.id,
          name: item.name !== null ? item.name : "Unknwon",
          title: item.title !== null ? item.title : "Unknown",
          company:
            item.organization && item.organization.name !== null
              ? item.organization.name
              : "Unknown",
          contactLocation:
            item.city !== null ? item.city + ", " + item.state : "Unknown",
          companyId: item.organization_id,
          employee_no: 0,
          email: item?.email !== null ? item.email : "Unknown",
          industry: "",
          keywords: "",
        });
      });

      const org_ids = output.map((item) => ({
        id: item.id,
        companyId: item.companyId,
      }));

      return {
        success: true,
        data: output,
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

export const searchOrgSnippets = async (body) => {
  if (!body.hasOwnProperty("ids")) {
    return {
      success: false,
      message: "Invalid Application Input! Stopped at Client!",
    };
  }

  try {
    const result = await axios.post(BASE_URL + SEARCH_SNIPPETS_PATH, body);
    console.log(result);

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
