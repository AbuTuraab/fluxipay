const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors()); 
app.use(express.json());

// BLOCK 5: Defining Routes
const transferRoute = require("./routes/transfer");
app.use("/transfer", transferRoute);  

//webhooks route
const webhooksRoute = require("./routes/webhooks");
app.use("/webhooks", webhooksRoute);

const fetchBankListRoute = require('./fetchbankslist/fetchBankList')
app.use("/fetchbankslist", fetchBankListRoute);

const validateAccount = require("./routes/accountValidate")
app.use("/validateAccount", validateAccount);
// BLOCK 6: Starting the Server
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
