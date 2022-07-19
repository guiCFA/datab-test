const axios = require("axios");

const api = axios.create({
  baseURL: 'https://app.omie.com.br/api/v1'
});

module.exports = api;
