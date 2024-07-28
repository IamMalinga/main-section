const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const { auth } = require('./middlewares/auth');

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // Serve static files from /assets

// Database connection
mongoose.connect('mongodb+srv://group_11:12345mdb@cluster0.ihxkq.mongodb.net/travelPlanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api', require('./routes'));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
