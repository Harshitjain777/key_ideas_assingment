const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const WeddingProduct = require('../models/weddingProduct');
const connectDB = require('../config/db');

const importCSV = async () => {
  await connectDB();  // Ensure that the database connection is established

  const results = [];
  fs.createReadStream('./data/Wedding_Products_with_Prices.csv') // Adjust the file path as needed
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Insert data into MongoDB
        const insertResult = await WeddingProduct.insertMany(results);
        console.log(`${insertResult.length} records inserted.`);
      } catch (insertError) {
        console.error('Error inserting data:', insertError);
      } finally {
        mongoose.connection.close();
      }
    });
};

// Execute the importCSV function
importCSV();
