// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection setup
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected!`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Call the connectDB function to establish the database connection
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Define the port and start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
