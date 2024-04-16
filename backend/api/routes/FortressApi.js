const authController = require("../controllers/auth");
const FormData = require("form-data");
const formidable = require("formidable");
const express = require("express");
const axios = require("axios");

const router = express.Router();
const {
  Configuration,
  Products,
  PlaidApi,
  PlaidEnvironments,
} = require("plaid");
const User = require("../models/user");

const KYC = require("../models/kycModel");
const { receiveCountryList, senderCountryList } = require("../utils/data");

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "65046d3f8baa02001b037963",
      "PLAID-SECRET": "3d96fbf2c0372ce60bf6b9a258c981",
      "Plaid-Version": "2020-09-14",
    },
  },
});

// const exchangeRateApiKey = process.env.YOUR_EXCHANGERATE_API_KEY

const plaidClient = new PlaidApi(configuration);
// create organization
const createOrganization = async (req, res) => {
  try {
    const response = await axios.post(
      "https://fortress-sandbox.us.auth0.com/oauth/token",
      {
        grant_type: "password",
        client_id: "pY6XoVugk1wCYYsiiPuJ5weqMoNUjXbn",
        audience: "https://fortressapi.com/api",
        username: "Info@faremit.com",
        password: "2rI_%yu%exYqkh!cYwrD",
      }
    );

    const data = response.data;

    res.json({ ...data });
  } catch (error) {
    res.json(error);
  }
};

// create user in fortress the user is from our database just to not create user multible times
const createUser = async (req, res) => {
  try {
    const token = req.headers.authorization_external;
    // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlYycEtyLTlQUGotRVFLR1d4cV8yMiJ9.eyJodHRwczovL2ZvcnRyZXNzYXBpLmNvbS9vcmdhbml6YXRpb25faWQiOiJiYTNlY2JjZS00ZmMyLTRiN2YtOGFhYi02MWU5NDg0N2I3MWUiLCJodHRwczovL2ZvcnRyZXNzYXBpLmNvbS9pc2FfYWNjb3VudF9hbGxvd2VkIjpmYWxzZSwiaHR0cHM6Ly9mb3J0cmVzc2FwaS5jb20vZmVlc19hY2NvdW50X2FsbG93ZWQiOmZhbHNlLCJodHRwczovL2ZvcnRyZXNzYXBpLmNvbS9hbGxvd2VkX3N1Yl9hcGlzIjoxNSwiaHR0cHM6Ly9mb3J0cmVzc2FwaS5jb20vY3J5cHRvX2xwIjoyLCJodHRwczovL2ZvcnRyZXNzYXBpLmNvbS9pc19yZWFkb25seSI6ZmFsc2UsImh0dHBzOi8vZm9ydHJlc3NhcGkuY29tL2FwaV91c2VyX3R5cGUiOiJPcmdhbml6YXRpb24iLCJpc3MiOiJodHRwczovL2ZvcnRyZXNzLXNhbmRib3gudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY0ZmEzZWI4MjQyODIzMTRhZTFlNWE0NyIsImF1ZCI6Imh0dHBzOi8vZm9ydHJlc3NhcGkuY29tL2FwaSIsImlhdCI6MTcwMzY5MTc1MywiZXhwIjoxNzAzNjk1MzUzLCJhenAiOiJwWTZYb1Z1Z2sxd0NZWXNpaVB1SjV3ZXFNb05ValhibiIsImd0eSI6InBhc3N3b3JkIn0.Mt1zX1Ic7b31DMcM7amKdFA8BEhOjMoSOC4rnb6IXXkMutDp7FpmDXZWRJCty2Y2ozwnbjMyK3HC0ajBp-BLpP4wJBPKbj8bbtPf7emkfoVRI8jox9PzXndiRtH09NRsiSLn6Wm4zwH56weMlqGW7nTYUQJu4pDcffDzDvNtgd23OveluHBLSCpqUfkWT7epRvZdlwO4VS964hJcWB-p5N3cvvX8KL6yhjwbl6n4DBB70YPGrY7yvjMnkfodLOZ-Ecbd2jBAi2tq1r9FEHuM3WNLkbpgqmFgNytIXEynKhunx-D_YGmZvWFmItSFI0mTywewxJswD0Cox88CkpwL1A";
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }
    const identityId = req.user.identityId;

    if (identityId && identityId.length > 0) return res.json({ identityId });
    console.log(req.user);
    console.log(req.user.country.value);
    const requestData = {
      firstName: req.user.name, //L0
      lastName: req.user.name,
      phone: req.user.phone,
      email: req.user.Email,
      address: {
        street1: req.user.address,
        postalCode: req.user.postalCode,
        city: "string",
        state: req.user.city,
        country: req.user.country.label,
      },
    };
    const response = await axios.post(
      "https://api.sandbox.fortressapi.com/api/trust/v1/identity-containers",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    const External_identityId = response.data.personalIdentity;
    req.user.identityId = External_identityId;
    await req.user.save();
    res.json({ identityId });
  } catch (error) {
    console.log(error.response.data.errors);
    if (error.response) {
      if (error.response.status === 409) {
        const identityId = error.response.data.title;
        res.status(409).json({ error: identityId });
      } else if (error.response.status === 401) {
        res.status(409).json({ error: "Un authorizddd" });
      } else {
        res.json({ error: error.response.data.errors });
      }
    } else {
      res.json({ error: error.response.data.errors });
    }
  }
};

const createExternalAccount = async (req, res) => {
  try {
    const token = req.headers.authorization_external;
    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }
    const requestData = {
      identityId: req.user.identityId,
      processorToken: req.body.processor_token,
      financialAccountsProvider: "plaidProcessorToken",
    };

    const response = await axios.post(
      "https://api.sandbox.fortressapi.com/api/trust/v1/external-accounts/financial",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = response.data; // Assuming the response data contains the relevant information
    res.json(responseData);
  } catch (error) {
    res.status(500).json(error);
  }
};
// creates link for plaid
const Create_Link = async function (request, response) {
  const req = {
    user: {
      client_user_id: request.user.identityId,
      // phone_number: request.user.phone,
    },
    client_name: "Faremit",
    products: ["transactions", "auth"],
    country_codes: [request.user.country.label],
    language: "en",
    webhook: "https://sample-web-hook.com",
    redirect_uri: "https://domainname.com/oauth-page.html",
  };
  console.log(req);
  try {
    const plaidResponse = await plaidClient.linkTokenCreate(req);
    const linkTokenData = plaidResponse.data;
    response.json({ linkTokenData });
  } catch (error) {
    console.log(error.response.data);
    response.json(error.response.data);
  }
};
const Create_processor_Token = async function (request, response) {
  const public_token = request.body.public_token;
  const accountID = request.body.accountID;
  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });
    const accessToken = tokenResponse.data.access_token;
    const request = {
      access_token: accessToken,
      account_id: accountID,
      processor: "fortress_trust",
    };
    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data;
    response.json(processorToken);
  } catch (error) {
    response.status(500).json({ error: error });
  }
};

//=================================================

//!=== REMOVE
const getSingleCodeRates = async function (request, response) {
  try {
    const exchangeRateApiKey = process.env.YOUR_EXCHANGERATE_API_KEY;

    const { _base } = request.params;
    if (!_base) {
      return response.status(403).json({
        result: "error",
        "error-type": "unknown-code",
        message: "Please provide a code",
      });
    }

    const fetchData = await axios.get(
      `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/${_base.toUpperCase()}`
    );

    const responseData = fetchData.data;
    response.status(200).json(responseData);
  } catch (error) {
    response.status(500).json({
      result: "error",
      "error-type": "unknown-code",
      message: error.message,
      reason: error.reason,
    });
  }
};
const getPairCodeRates = async function (request, response) {
  try {
    const exchangeRateApiKey = process.env.YOUR_EXCHANGERATE_API_KEY;

    const { _base, _target } = request.params;
    if (!_target || !_base) {
      return response.status(403).json({
        result: "error",
        "error-type": "unknown-code",
        message: "Please provide both pair codes",
      });
    }

    const fetchData = await axios.get(
      `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/pair/${_base.toUpperCase()}/${_target.toUpperCase()}`
    );

    let responseData = fetchData.data;

    if (_base.toUpperCase() === "USD" && _target.toUpperCase() === "SOS") {
      const originalConversionRate = responseData["conversion_rate"];
      const newConversionRate = originalConversionRate * 1.03;

      responseData = { ...responseData, conversion_rate: newConversionRate };
    } else {
      const originalConversionRate = responseData["conversion_rate"];
      const newConversionRate = originalConversionRate * 1.04;

      responseData = { ...responseData, conversion_rate: newConversionRate };
    }

    response.status(200).json(responseData);
  } catch (error) {
    response.status(500).json({
      result: "error",
      "error-type": "unknown-code",
      message: error.message,
      reason: error.reason,
    });
  }
};
const getPairCodeRatesWithAmount = async function (request, response) {
  try {
    console.log(response);
    const exchangeRateApiKey = process.env.YOUR_EXCHANGERATE_API_KEY;

    const { _base, _target, _amount } = request.params;
    if (!_target || !_base) {
      return response.status(403).json({
        result: "error",
        "error-type": "unknown-code",
        message: "Please provide both pair codes",
      });
    }
    if (!_amount) {
      return response.status(403).json({
        result: "error",
        "error-type": "unknown-code",
        message: "Please provide base amount",
      });
    }

    const fetchData = await axios.get(
      `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/pair/${_base.toUpperCase()}/${_target.toUpperCase()}/${_amount}`
    );
    console.log(fetchData);
    let responseData = fetchData.data;

    if (_base.toUpperCase() === "USD" && _target.toUpperCase() === "SOS") {
      const originalConversionRate = responseData["conversion_rate"];
      const newConversionRate = originalConversionRate * 1.03;

      responseData = {
        ...responseData,
        conversion_rate: newConversionRate,
        conversion_result: newConversionRate * _amount,
      };
    } else {
      const originalConversionRate = responseData["conversion_rate"];
      const newConversionRate = originalConversionRate * 1.04;

      responseData = {
        ...responseData,
        conversion_rate: newConversionRate,
        conversion_result: newConversionRate * _amount,
      };
    }

    response.status(200).json(responseData);
  } catch (error) {
    response.status(500).json({
      result: "error",
      "error-type": "unknown-code",
      message: error.message,
      reason: error.reason,
    });
  }
};

//!=== REMOVE
const getCountriesList = async function (request, response) {
  try {
    response
      .status(200)
      .json({ canReceive: receiveCountryList, canSend: senderCountryList });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      reason: error.reason,
    });
  }
};

//!=== In Process
const submitKYCdocs = async (req, res) => {
  try {
    const token = req.headers.authorization_external;

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    const { userId } = req.params;
    console.log("hpaorroq", req.body, userId);

    const userData = await User.findById(userId);
    req.user = userData;

    if (!req.user) {
      return res.status(403).json({
        status: "error",
        message: "User not found with id: " + userId,
      });
    }

    if (!req.user.identityId) {
      return res.status(403).json({
        status: "error",
        message: "User Identity ID not found with id: " + userId,
      });
    }

    // const formData = new FormData();
    // formData.append('DocumentType', 'license');
    // formData.append('DocumentFront', selectedFile);
    // formData.append('DocumentBack', selectedFile2);

    // const bodyData = {
    //   DocumentType:'license',
    //   DocumentFront:'license',
    //   DocumentBack:'license',
    // }

    const url = `https://api.sandbox.fortressapi.com/api/compliance/v1/personal-identities/${req.user.identityId}/documents`;

    axios({
      url,
      method: "POST",
      data: req.body,
      headers: {
        // ...formData.getHeaders(),
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("=== error: " + err));

    //!==========================

    // sdk.auth(`Bearer ${token}`);
    // sdk.postApiComplianceV1PersonalIdentitiesIdentityidDocuments(req.body, {
    //   identityId: req.user.identityId
    // })
    //   .then(({ data }) => {

    //     console.log("Success  ==== HERE")

    //     console.log(data)
    //    return res.status(200).json({ message:'Documents Submitted Successfully' });

    //   })
    //   .catch(err => {
    //     console.log("Error  ==== HERE")
    //     console.log(err)
    //     return res.json(err);

    //   });

    // {
    //   "id": "0b10f0c2-7efd-47f5-9753-2e921e7692d6",
    //   "identityId": "ca9454e2-992b-4e01-adc8-842e8b8d773a",
    //   "personalDocumentType": "license",
    //   "documentCheckStatus": "pending",
    //   "isVerified": false
    // }

    res.status(200).json({});
  } catch (error) {
    // console.log(error.response.data.errors);
    // console.log(error?.response?.data);

    res.json(err);
  }
};

const createExternalPayment = async (req, res) => {
  try {
    const token = req.headers.authorization_external;

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    if (!req.user) {
      return res.status(403).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!req.user.identityId) {
      return res.status(403).json({
        status: "error",
        message: "User Identity ID not found with id: ",
      });
    }

    // console.log(req.body);

    const {
      sourceExternalAccountId,
      destinationExternalAccountId,
      funds,
      purposeOfPayment,
    } = req.body;
    if (!sourceExternalAccountId || !destinationExternalAccountId) {
      return res.status(403).json({
        status: "error",
        message: "Provide both (source and destination) account IDs ",
      });
    }
    if (!funds || Number(funds) <= 0) {
      return res.status(403).json({
        status: "error",
        message: "Provide a valid fund transfer amount",
      });
    }
    if (!purposeOfPayment) {
      return res.status(403).json({
        status: "error",
        message: "Provide purpose of payment",
      });
    }

    let bodyData = {
      source: {
        //required
        externalAccountId: req?.body?.sourceExternalAccountId,
      },
      destination: {
        //required
        externalAccountId: req?.body?.destinationExternalAccountId,
      },
      comment: req?.body?.comment,
      funds: req?.body?.funds,
      memo: req?.body?.memo,
      useIsa: req?.body?.useIsa,
      purposeOfPayment: req?.body?.purposeOfPayment, //required
    };

    const url = "https://api.sandbox.fortressapi.com/api/trust/v1/payments";
    const response = await axios.post(url, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);

    res.json(error);
  }
};
const createCustodialPayment = async (req, res) => {
  try {
    const token = req.headers.authorization_external;

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    if (!req.user) {
      return res.status(403).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!req.user.identityId) {
      return res.status(403).json({
        status: "error",
        message: "User Identity ID not found with id: ",
      });
    }

    // console.log(req.body);

    const {
      sourceCustodialAccountId,
      destinationCustodialAccountId,
      funds,
      purposeOfPayment,
    } = req.body;
    if (!sourceCustodialAccountId || !destinationCustodialAccountId) {
      return res.status(403).json({
        status: "error",
        message: "Provide both (source and destination) account IDs ",
      });
    }
    if (!funds || Number(funds) <= 0) {
      return res.status(403).json({
        status: "error",
        message: "Provide a valid fund transfer amount",
      });
    }
    if (!purposeOfPayment) {
      return res.status(403).json({
        status: "error",
        message: "Provide purpose of payment",
      });
    }

    let bodyData = {
      source: {
        //required
        custodialAccountId: req?.body?.sourceCustodialAccountId,
      },
      destination: {
        //required
        custodialAccountId: req?.body?.destinationCustodialAccountId,
      },
      comment: req?.body?.comment,
      funds: req?.body?.funds,
      memo: req?.body?.memo,
      useIsa: req?.body?.useIsa,
      purposeOfPayment: req?.body?.purposeOfPayment, //required
    };

    const url = "https://api.sandbox.fortressapi.com/api/trust/v1/payments";
    const response = await axios.post(url, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error.response.data.errors);
    if (error.response) {
      if (error.response.status === 400) {
        res.status(400).json({ error: error.response.data.title });
      }
      //  else if (error.response.status === 401) {
      //   res.status(409).json({ error: "Un authorizddd" });
      // } else {
      //   res.json({ error: error.response.data.errors });
      // }
    } else {
      res.json({ error: error.response.data.errors });
    }
  }
};

router.post("/org", authController.protect, createOrganization);
router.post("/user", authController.protect, createUser);
router.post("/External_account", authController.protect, createExternalAccount);
router.post("/create_link_token", authController.protect, Create_Link);
router.post("/processorToken", authController.protect, Create_processor_Token);

// router.post("/user/:userId/submitkyc",express.raw({type: 'multipart/form-data'}), submitKYCdocs);
router.post("/user/:userId/submitkyc", submitKYCdocs);
router.post(
  "/user/payment_external",
  authController.protect,
  createExternalPayment
);
router.post(
  "/user/payment_custodial",
  authController.protect,
  createCustodialPayment
);

// router.get("/paircode/:_base",authController.protect, getSingleCodeRates); //!=== REMOVE
router.get(
  "/paircode/:_base/:_target",
  authController.protect,
  getPairCodeRates
);
router.get(
  "/paircode/:_base/:_target/:_amount",
  // authController.protect,
  getPairCodeRatesWithAmount
);
router.get("/countrylist", getCountriesList);

module.exports = router;

///====================================
// const FormData = require('form-data');
// const fetch = require('node-fetch');
// const formData = new FormData();

// formData.append('DocumentType', 'license');

// const url = 'https://api.sandbox.fortressapi.com/api/compliance/v1/personal-identities//documents';
// const options = {method: 'POST', headers: {accept: 'application/json'}};

// options.body = formData;

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));
