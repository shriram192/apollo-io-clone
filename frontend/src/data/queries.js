import 'axios'

const BASE_URL = 'http://localhost'

const SEARCH_PATH = '/search'
const TAG_LOCATION_PATH ='/tag/location'
const TAG_ORGANIZATION_PATH = '/tag/organization'
const SEARCH_SNIPPETS_PATH = '/search/snippet'

const searchPeople = async (body) => {

    if(!(body['q_person_name'] || body['person_locations'] || body['organization_ids'])) {
        return {
            success: false,
            message: "Invalid Input from application stopped at client!"
        }
    }

    try {
        const result = await axios.post(BASE_URL + SEARCH_PATH, body)
        console.log(result)

        if (result.status === 200) {
            return {
                success: true,
                data: result.data
            }
        } 
        return {
            success: false,
            message: "Failed to Search Data!"
        }
    } catch(e) {
        console.log(e)
        return {
            success: false,
            message: "Failed to Search Data!"
        }
    }
}

const getLocationTags = async (params) => {

    if(!(params['q_tag_fuzzy_name'] && params['kind'])) {
        return {
            success: false,
            message: "Invalid Input from application stopped at client!"
        }
    }

    try {
        const result = await axios.get(BASE_URL + TAG_LOCATION_PATH, params)
        console.log(result)

        if (result.status === 200) {
            return {
                success: true,
                data: result.data
            }
        } else {
            return {
                success: false,
                message: "Unable to get Location Tags"
            }
        }


    } catch(e) {
        console.log(e)
        return {
            success: false,
            message: "Unable to get Location Tags"
        }
    }
}

const getOrganizationTags = async (body) => {

    if(!body['q_organization_fuzzy_name']) {
        return {
            success: false,
            message: "Invalid Application Input, Stopped at Client!"
        }
    }
    try {
        const result = await axios.post(BASE_URL + TAG_ORGANIZATION_PATH, body)
        console.log(result)

        if (result.status === 200) {
            return {
                success: true,
                data: result.data
            }
        } 
        return {
            success: false,
            message: "Failed to get Organization Tag Data!"
        }
    } catch(e) {
        console.log(e)
        return {
            success: false,
            message: "Failed to get Organization Tag Data!"
        }
    }
}

const searchOrgSnippets = async (body) => {

    if(!body['ids']) {
        return {
            success: false,
            message: "Invalid Application Input! Stopped at Client!"
        }
    }

    try {
        const result = await axios.post(BASE_URL + SEARCH_SNIPPETS_PATH, body)
        console.log(result)

        if (result.status === 200) {
            return {
                success: true,
                data: result.data
            }
        } 
        return {
            success: false,
            message: "Failed to get Organization Snippets Data!"
        }
    } catch(e) {
        console.log(e)
        return {
            success: false,
            message: "Failed to get Organization Snippets Data!"
        }
    }
}