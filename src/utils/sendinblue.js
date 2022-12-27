let SibApiV3Sdk = require('sib-api-v3-sdk');

let defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_SMTP





module.exports = SibApiV3Sdk