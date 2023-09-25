const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/location", async (req, res) => {
  console.log("Initialized Tag Location Function!");
  console.log("Functon Request Params: ", req.query);

  if (
    !(
      req.query.hasOwnProperty("q_tag_fuzzy_name") &&
      req.query.hasOwnProperty("kind")
    )
  ) {
    return res.status(400).json({
      message: "Invalid API Input, does not contain the required fields!",
    });
  }

  try {
    const result = await axios.get(process.env.TAG_URL, {
      params: { ...req.query, api_key: process.env.API_KEY },
    });
    console.log("API Response: ", result.data);

    if (result.status === 200) {
      return res.status(200).json({
        data: result.data,
      });
    } else {
      return res.status(500).json({
        message: "API Failed to return data!",
      });
    }
  } catch (e) {
    console.log("API Call post error", e);
    return res.status(500).json({
      message: "Server failed to get data from API!",
    });
  }
});

router.post("/organization", async (req, res) => {
  console.log("Initialized Tag Organization Function!");
  console.log("Functon Request body: ", req.body);

  if (!req.body.hasOwnProperty("q_organization_fuzzy_name")) {
    return res.status(400).json({
      message: "Invalid API Input, does not contain the required fields!",
    });
  }

  try {
    const request_body = { ...req.body, api_key: process.env.API_KEY };
    console.log("API Request Body: ", request_body);

    const result = await axios.post(process.env.ORG_URL, request_body);
    console.log("API Response: ", result.data);

    if (result.status === 200) {
      return res.status(200).json({
        data: result.data,
      });
    } else {
      return res.status(500).json({
        message: "API Failed to return data!",
      });
    }
  } catch (e) {
    console.log("API Call post error", e);
    return res.status(500).json({
      message: "Server failed to get data from API!",
    });
  }
});

module.exports = router;
