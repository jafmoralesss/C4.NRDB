const express = require('express');
const { connectDB } = require('./database');
const DataController = require('./controllers/data.controller');

const app = express();
const PORT = 3000;

async function startServer() {

  await connectDB();

  app.use(express.json());
  app.get('/api/data', DataController.getAllData);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();