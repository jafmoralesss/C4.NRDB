const express = require('express');
const { connectDB } = require('./database');
const DataController = require('./controllers/data.controller');
const UserController = require('./controllers/user.controller');
const { authenticateToken } = require('./middleware/auth.middleware');
const {authorizeManager} = require ('./middleware/authManager.middleware');

const app = express();
const PORT = 3000;

async function startServer() {
  await connectDB();

  app.use(express.json());
  app.get('/api/restaurants', DataController.getAllData);
  app.post('/api/restaurants', authenticateToken, authorizeManager, DataController.createData);
  app.put('/api/restaurants/:id', authenticateToken, authorizeManager, DataController.updateData);
  app.delete('/api/restaurants/:id', authenticateToken, authorizeManager, DataController.deleteData); 
  app.post('/api/restaurants/:id/reviews', authenticateToken, DataController.addReview);

  app.post('/api/users/register', UserController.registerUser);
  app.post('/api/users/login', UserController.loginUser);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();