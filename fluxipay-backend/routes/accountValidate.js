const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

const cors = require("cors");
const axios = require("axios");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const token = Buffer.from(
  `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
).toString("base64");   
 
 
router.post("/validateAccount", async (req, res) => {
  const { recipientBankAccount, selectedBankCode } = req.body;
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
    baseURL: 'https://sandbox.monnify.com/api/v1/disbursements/account/validate',
    data:{
    "accountNumber": `${recipientBankAccount}`,
    "bankCode": `${selectedBankCode}`
    },
    headers:{
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json",
    }
   })
    console.log(response.data);
   res.status(200).json(response.data);

  } catch (error) {
    console.error('Error sending request to Monnify:', error.message);
  }
}); 



module.exports = router;
