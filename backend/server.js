const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
