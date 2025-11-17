const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());         1                                                                                                                                                                                                                                                                     

const amountInUSD  = (numberOfTokens) => {
    const tokenprice = 1;
    return numberOfTokens * tokenprice;

}

module.exports = amountInUSD;