const express = require("express");
const cors = require("cors");
const api = require("../services/api");
const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config()

app.get("/omie/clients", async (req, res) => {
  const { data } = await api.post('geral/clientes/', {
    app_key: process.env.OMIE_APP_KEY,
    app_secret: process.env.OMIE_APP_SECRET,
    call: 'ListarClientes',
    param: [
      {
        pagina: 1,
        registros_por_pagina: 50,
        apenas_importado_api: "N"
      }
    ]
  });

  return res.json(data);
});

app.get("/omie/products", async (req, res) => {
  const { data } = await api.post('produtos/pedido/', {
    app_key: process.env.OMIE_APP_KEY,
    app_secret: process.env.OMIE_APP_SECRET,
    call: 'ListarPedidos',
    param: [
      {
        pagina: 1,
        registros_por_pagina: 50,
        apenas_importado_api: "N"
      }
    ]
  });

  return res.json(data);
});

app.listen(3333, () => {
  console.log('App listening on port 3333');
});

module.exports = app;