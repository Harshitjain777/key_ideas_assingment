const express = require('express');
const router = express.Router();
const WeddingProduct = require('../models/weddingProduct');

// Route to get paginated wedding products
router.get('/getproducts', async (req, res) => {
  // Get page and limit from query parameters, default to page 0 and limit 12
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 12;

  try {
    // Get total count of documents
    const totalProducts = await WeddingProduct.countDocuments();
    
    // Get paginated products
    const products = await WeddingProduct.find()
      .skip(page * limit)
      .limit(limit);

    // Return paginated response with metadata
    res.json({
      total: totalProducts,
      page,
      limit,
      products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
