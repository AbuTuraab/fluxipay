const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const amountInUSD = require("../priceCalculator/dotcalculator");

const cors = require("cors");
const axios = require("axios");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ApiKey = process.env.MONNIFY_API_KEY;
const SecretKey = process.env.MONNIFY_SECRET_KEY; 

const token = Buffer.from(
  `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
).toString("base64");  

 

router.get("/calculateamount", async(req,res) => {
const { amount } = req.query;  

 
const amountToReceiveInNaira = amountInUSD(amount) * 1500;
// console.log("amountToReceiveInNaira is", amountToReceiveInNaira);
 res.status(200).json({ amountToReceiveInNaira: amountToReceiveInNaira });
});



router.post("/", async (req, res) => {
  const { amount, recipientBankAccount, selectedBankCode } = req.body;

   
//console.log(amountToReceiveInNaira);
const amountToReceiveInNaira = amountInUSD(amount) * 1500;
console.log("amountToReceiveInNaira is", amountToReceiveInNaira);
 res.status(200).json({ amountToReceiveInNaira: amountToReceiveInNaira });

 console.log("receipientBank account is", recipientBankAccount);
  
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
    method: 'post',
    baseURL: 'https://sandbox.monnify.com/api/v2/disbursements/single',
    data:{
    "amount": `${amountToReceiveInNaira}`, 
    "reference":`reference-0x${Math.floor(Math.random() * 1000000000)}`,
    "narration":`Transfer to ${recipientBankAccount}`,
    "destinationBankCode": `${selectedBankCode}`,
    "destinationAccountNumber": `${recipientBankAccount}`,
    "currency": "NGN",
    "sourceAccountNumber": "3359886717",
    "async":true
    },
    headers:{
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json",
    }
   })
    // console.log(response.data);
    return;

  } catch (error) {
    console.error('Error sending request to Monnify:', error.message);
  }
}); 



module.exports = router;
