#  **FluxiPay**

### **A seamless, user-friendly way to convert Polkadot stablecoins to Nigerian Naira (NGN) and other fiat in real-time**

---

##  **Overview**

**FluxiPay** is a fully on-chain/off-chain integrated financial solution that allows users to **swap DOT for Nigerian Naira instantly** through a simplified web interface.

The project removes the complexity of crypto off-ramping by integrating:
* **Lunokit** for wallet management and token transfers within the polkadot ecosystem
* A secure **Node.js backend** for swap logic and payment reconciliation
* **Monnify fintech APIs** to complete NGN payouts to any Nigerian bank
* **React frontend** for seamless user experience
* End-to-end transaction reference tracking

This project solves a real need in African crypto markets: **fast, simple, compliant crypto-to-fiat conversion**, built securely on **Polkadot blockchain**.

---

# **Features**

###  **1. On-chain Token Transfer (Lunokit and PolkadotApi(PAPI))**

* Users initiate a swap by sending their stablecoins to a backend-controlled wallet
* The Polkadot APi uses a trasnfer function that **automatically transfers tokens** to the backend wallet
* Successful token transfer are checked before fiat transfer to the supplied bank account is triggered

###  **2. Real-time Conversion Logic**

* Backend converts USD → NGN using a configurable rate
* Ensures users always get an accurate NGN amount

### **3. NGN Payouts via Monnify**

* Integrates Monnify disbursement API
* Sends direct bank transfers to the user
* Webhooks handle payout confirmation

### **4. React UI**

* Users input Token amount
* See NGN amount in real-time
* Select bank from dropdown (dynamic list from backend)
* Enter account details

### **5. Reliable Transaction Confirmation**


### **6. Secure Architecture**

* env-protected API keys
* Backend validation
* Safe sending of DOT
* No private keys exposed
* Isolated payout logic

---

# **Tech Stack**

### **Smart Contract**
* Lunokit for wallet management
* PolkadotApi for token transfers

### **Backend**

* Node.js + Express
* axios for API calls
* Monnify API integration
* Webhook server

### **Frontend**

* React + TypeScript
* Chakra UI
* Axios

---

#  **Project Workflow**

### **1. User enters Token amount**

The UI calculates Naira amount using backend conversion logic.

### **2. User signs swap transaction**

* The frontend sends the swap request to backend
* Backend provides a **unique transaction reference**

### **3. Lunokit and PolkadotApi transfers Tokens**

Lunokit and PolkadotApi immediately move Tokens to backend wallet.

### **4. Backend initiates Monnify payout**

* `GET /auth/login` → Get OAuth token
* `POST /disbursements/single` → Send money to user’s bank

### **5. Webhook receives status**

Backend updates DB based on Monnify webhook event:

* SUCCESS
* FAILED
* PENDING

Once SUCCESS, UI displays the amount received in the recipient's naira bank account.

---

---

# **How to Run the Project**

### 1. Clone repo

```bash
git clone https://github.com/AbuTuraab/fluxipay.git
cd fluxipay
```

### 2. Environment variables (`.env`)

```
API_KEY=your_monnify_api_key
SECRET_KEY=your_monnify_secret

```

### 3. Start backend and frontend concurrently using 

```bash
npm run dev
```
---

#  **Impacts of FluxiPay**

### ✔ Real problem in Africa

No easy, trustless way to off-ramp Stablecoins to fiat for Polkadot users.

### ✔ Innovative use of Polkadot API and Lunokit

### ✔ Production-level integration

Monnify payouts, webhook-based transaction tracking.

### ✔ High impact

Bridges Polkadot ecosystem to one of the largest crypto markets which is Africa.

---

### Future Improvemens
Expanding to other African countries
Integration Fiat to stablecoins swap in order to improve the inclusiveness of more users.