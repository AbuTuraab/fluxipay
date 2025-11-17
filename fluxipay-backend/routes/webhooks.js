const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

const cors = require("cors");
const axios = require("axios");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

router.post("/monnifywebhook", async (req, res) => {

    res.status(200);
    try {
        const { transactionReference, status, amount, currency } = req.body;
        res.status(200).json({ 
            message: 'Webhook received', 
            data: req.body 
        });
          

    } catch (error) {
        console.error("Error handling webhook:", error);
    }
} )


module.exports = router