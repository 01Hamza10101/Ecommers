// import axios from 'axios';
// import SHA256 from 'crypto-js/sha256.js';

// async function PaymentGateway(req, res) {
//     const PHONE_PAY_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
//     const PAY_END_POINT = "/pg/v1/pay";
//     const MERCHANT_ID = "PGTESTPAYUAT";
//     const SALT_INDEX = 1;
//     const SALT_KEY = "58a63b64-574d-417a-9214-066bee1e4caa";
//     const MERCHANT_TRANSACTIONID = "MT7850590068188104";

//     const payload = {
//         "merchantId": MERCHANT_ID,
//         "merchantTransactionId": MERCHANT_TRANSACTIONID,
//         "merchantUserId": "MUID123",
//         "amount": 10000,
//         "redirectUrl": `http://localhost:5173/redirecturl/${MERCHANT_TRANSACTIONID}`,
//         "redirectMode": "REDIRECT",
//         "mobileNumber": "9999999999",
//         "paymentInstrument": {
//             "type": "PAY_PAGE"
//         }
//     };

//     const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
//     const base63EncodedPayload = bufferObj.toString("base64");
//     const xVerify = SHA256(base63EncodedPayload + PAY_END_POINT + SALT_KEY).toString() + "###" + SALT_INDEX;

//     const options = {
//         method: 'post',
//         url: `${PHONE_PAY_HOST_URL}${PAY_END_POINT}`,
//         headers: {
//             accept: 'text/plain',
//             'Content-Type': 'application/json',
//             'x-VERIFY': xVerify,
//         },
//         data: {
//             request: base63EncodedPayload,
//         }
//     };

//     console.log('Request Options:', options);

//     try {
//         const response = await axios.request(options);
//         console.log(response.data);
//         return res.status(200).send(response.data);
//     } catch (error) {
//         console.error('Error Response:', error.response ? error.response.data : error.message);
//         return res.status(500).json({ error: 'Payment request failed', details: error.message });
//     }
// }

// export default PaymentGateway;

import axios from 'axios';
import crypto from 'crypto';

const PaymentGateway = async (req, res) => {
    try {
        const merchantTransactionId = 'M' + Date.now();
        const { user_id, price, phone, name } = req.body;
        const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

        const data = {
            merchantId: 'PGTESTPAYUAT',
            merchantTransactionId: merchantTransactionId,
            merchantUserId: 'MUID' + 'user_id' + Date.now(), // Fixed user_id usage
            name: 'Hanzla', // Fixed name usage
            amount: 1000 * 100, // Ensure price is multiplied correctly
            redirectUrl: `http://localhost:3001/api/v1/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: 8989897878, // Ensure phone is passed correctly
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 2; // Make sure this is the correct index
        const string = payloadMain + '/pg/v1/pay' + SALT_KEY;

        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + 1;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        // Use await with axios
        const response = await axios.request(options);
        return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: error.message,
            success: false
        });
    }
}

export default PaymentGateway;

const PaymentStatus = async (req, res) => {
    try {
        const merchantTransactionId = 'M' + Date.now();
        const { user_id, price, phone, name } = req.body;
        const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

        const data = {
            merchantId: 'PGTESTPAYUAT',
            merchantTransactionId: merchantTransactionId,
            merchantUserId: 'MUID' + 'user_id' + Date.now(), // Fixed user_id usage
            name: 'Hanzla', // Fixed name usage
            amount: 1000 * 100, // Ensure price is multiplied correctly
            redirectUrl: `http://localhost:3001/api/v1/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: 8989897878, // Ensure phone is passed correctly
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 2; // Make sure this is the correct index
        const string = payloadMain + '/pg/v1/pay' + SALT_KEY;

        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + 1;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        // Use await with axios
        const response = await axios.request(options);
        return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: error.message,
            success: false
        });
    }
}

export {PaymentStatus};
