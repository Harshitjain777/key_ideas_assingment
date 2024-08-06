const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Create the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/wedding-products', require('./routes/weddingProducts'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
