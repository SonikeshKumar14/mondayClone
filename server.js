const PORT = 8000;
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const url = process.env.URL;
const token = process.env.ASTRA_TOKEN;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tickets', async (req, res) => {
  try {
    const response = await axios.get(`${url}?page-size=20`, {
      headers: {
        'Accept': 'application/json',
        'X-Cassandra-Token': token,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/tickets', async (req, res) => {
  const formData = req.body.formData;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Accept': 'application/json',
        'X-Cassandra-Token': token,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId;

  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        'Accept': 'application/json',
        'X-Cassandra-Token': token,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.put('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId;
  const data = req.body.data;

  try {
    const response = await axios.put(`${url}/${id}`, data, {
      headers: {
        'Accept': 'application/json',
        'X-Cassandra-Token': token,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.delete('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId;

  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        'Accept': 'application/json',
        'X-Cassandra-Token': token,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log('Server running on PORT ' + PORT));
