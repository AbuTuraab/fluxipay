const express = require("express");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();

app.use = cors();
app.use = express.json();
dotenv.config();
const ApiKey = process.env.MONNIFY_API_KEY;
const SecretKey = process.env.MONNIFY_SECRET_KEY;

const token = Buffer.from(
  `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
).toString("base64"); 


router.get("/", async (req, res) => { 
  try {
    
    const loginRes = await axios({
        method: 'post',
       baseURL: "https://sandbox.monnify.com/api/v1/auth/login",
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json", 
        },
    });
    const accessToken = loginRes.data.responseBody.accessToken;
    const response = await axios({
        method: 'get',
        baseURL: 'https://sandbox.monnify.com/api/v1/banks',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    })
    res.status(200).json(response.data);
 

  } catch (error) {
    console.error('Error fetching bank list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
