const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req,res) => {
  console.log("Initialized Search Function!")
  console.log("Functon Request body: ",req.body)

  if(!(req.body['q_person_name'] || req.body['person_locations'] || req.body['organization_ids'])) {
   return res.status(400).json({
      message: "Invalid API Input, does not contain the required fields!"
    })
  }

  try {
    const request_body = { ...req.body, api_key: process.env.API_KEY }
    console.log("API Request Body: ", request_body)

    const result = await axios.post(process.env.PEOPLE_URL, request_body)
    console.log("API Response: ", result.data)

    if (result.status === 200) {
      return res.status(200).json({
        data: result.data
      })
    } else {
      return res.status(500).json({
        message: "API Failed to return data!"
      })
    }
  } catch(e) {
    console.log("API Call post error", e)
    return res.status(500).json({
      message: "Server failed to get data from API!"
    })
  }
});

router.post('/meta-data', async (req,res) => {
  console.log("Initialized Meta Data Function!")
  console.log("Functon Request body: ",req.body)

  if(!(req.body['q_person_name'] || req.body['person_locations'] || req.body['organization_ids'])) {
    return res.status(400).json({
      message: "Invalid API Input, does not contain the required fields!"
    })
  }

  try {
    const request_body = { ...req.body, api_key: process.env.API_KEY }
    console.log("API Request Body: ", request_body)

    const result = await axios.post(process.env.METADATA_URL, request_body)
    console.log("API Response: ", result.data)

    if (result.status === 200) {
      return res.status(200).json({
        data: result.data
      })
    } else {
      return res.status(500).json({
        message: "API Failed to return data!"
      })
    }
  } catch(e) {
    console.log("API Call post error", e)
    return res.status(500).json({
      message: "Server failed to get data from API!"
    })
  }
});

router.post("/snippet", async (req,res) => {
  console.log("Initialized Snippet Function!")
  console.log("Functon Request body: ",req.body)

  if(!req.body['ids']) {
    return res.status(400).json({
      message: "Invalid API Input, does not contain the required fields!"
    })
  }
  
  try {
    const request_body = { ...req.body, api_key: process.env.API_KEY }
    console.log("API Request Body: ", request_body)

    const result = await axios.post(process.env.SNIPPET_URL, request_body)
    console.log("API Response: ", result.data)

    if (result.status === 200) {
      return res.status(200).json({
        data: result.data
      })
    } else {
      return res.status(500).json({
        message: "API Failed to return data!"
      })
    }
  } catch(e) {
    console.log("API Call post error", e)
    return res.status(500).json({
      message: "Server failed to get data from API!"
    })
  }
})

module.exports = router