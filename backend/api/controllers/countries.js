const Country = require("../models/countries");
const axios = require("axios");

const countriesController = {
  uploadCountry: async (req, res) => {
    try {
      const { name, code, status, currency } = req.body;

      if (!name || !code || !status || !currency) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      let img, imgType;
      if (req.file) {
        const { fieldname, mimetype, buffer } = req.file;
        img = buffer;
        imgType = mimetype;
      }

      const newCountry = new Country({
        name,
        code,
        currency,
        status,
        img,
        imgType,
      });

      await newCountry.save();

      res
        .status(201)
        .json({ message: "Country uploaded successfully.", data: newCountry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error: " + error.message });
    }
  },

  getAllCountries: async (req, res) => {
    try {
      const countries = await Country.find();
      res.status(200).json(countries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error :" + error.message });
    }
  },

  getCountryById: async (req, res) => {
    try {
      if (!req.params.id) {
        return res
          .status(404)
          .json({ message: "Please provide country id in params" });
      }
      const countryResult = await Country.findById(req.params.id);
      if (!countryResult) {
        return res.status(404).json({ message: "Country not found" });
      }

      const exchangeRateApiKey = process.env.YOUR_EXCHANGERATE_API_KEY;

      const _base = countryResult.code;
      if (!_base) {
        return response.status(403).json({
          message: "Country code is missing provide a code",
        });
      }

      const fetchData = await axios.get(
        `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/${_base.toUpperCase()}`
      );

      const exchangeRates = fetchData.data.conversion_rates;

      // additional percentages
      const extraPercentageSOS = 3;
      const extraPercentageOthers = 4;

      // Loop through conversion rates and apply the additional percentages
      const updatedConversionRates = {};
      for (const currencyCode in exchangeRates) {
        if (currencyCode === _base.toUpperCase()) {
          // No changes to current data
          updatedConversionRates[currencyCode] = exchangeRates[currencyCode];
        } else if (currencyCode === "SOS") {
          // Apply 3% extra to SOS
          updatedConversionRates[currencyCode] =
            exchangeRates[currencyCode] * (1 + extraPercentageSOS / 100);
        } else {
          // Apply 4% extra to others
          updatedConversionRates[currencyCode] =
            exchangeRates[currencyCode] * (1 + extraPercentageOthers / 100);
        }
      }

      // exchangeRates = updatedConversionRates;

      // console.log(exchangeRatesData);

      res.json({ ...countryResult._doc, ExchangeRate: updatedConversionRates });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error :" + error.message });
    }
  },

  updateCountryById: async (req, res) => {
    try {
      if (!req.params.id) {
        return res
          .status(404)
          .json({ message: "Please provide country id in params" });
      }
      let countryResult = await Country.findById(req.params.id);
      if (!countryResult) {
        return res.status(404).json({ message: "Country not found" });
      }

      const { name, code, status, currency } = req.body;
      const { fieldname, mimetype, buffer } = req.file;

      if (
        !name ||
        !code ||
        !fieldname ||
        !mimetype ||
        !status ||
        !currency ||
        !buffer
      ) {
        return res.status(404).json({ message: "Please provide all fields" });
      }

      countryResult.name = name;
      countryResult.code = code;
      countryResult.currency = currency;
      countryResult.status = status;
      countryResult.img = buffer;
      countryResult.imgType = mimetype;

      await countryResult.save();

      res.json({
        message: "Country updated successfully.",
        data: countryResult,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error :" + error.message });
    }
  },

  deleteCountryById: async (req, res) => {
    try {
      if (!req.params.id) {
        return res
          .status(404)
          .json({ message: "Please provide country id in params" });
      }
      let countryResult = await Country.findByIdAndDelete(req.params.id);
      if (!countryResult) {
        return res.status(404).json({ message: "Country not found" });
      }
      res.json({ message: "Country deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error :" + error.message });
    }
  },
};

module.exports = countriesController;
