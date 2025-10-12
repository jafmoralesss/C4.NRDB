const express = require('express');
const { connectDB } = require('./database');
const DataController = require('./controllers/data.controller');
const UserController = require('./controllers/user.controller');

const app = express();
const PORT = 3000;

async function startServer() {
  await connectDB();

  app.use(express.json());
  app.get('/api/restaurants', DataController.getAllData);
  app.post('/api/restaurants', DataController.createData);
  app.put('/api/restaurants/:id', DataController.updateData);
  app.delete('/api/restaurants/:id', DataController.deleteData); 
  app.post('/api/restaurants/:id/reviews', DataController.addReview);

  app.post('/api/users/register', UserController.registerUser);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();