const mongoose = require('mongoose');

const weddingProductSchema = new mongoose.Schema({
  prod_sku: String,
  prod_Live_URL: String,
  prod_name: String,
  prod_long_desc: String,
  prod_type: String,
  prod_subcategory: String,
  prodmeta_section: String,
  prodmeta_ship_days: Number,
  prodmeta_metal_weight: String,
  prodmeta_side_diamonds_count: Number,
  attr_14k_regular:Number,
  attr_platinum_round_default_img: String,
  attr_platinum_round_img: String,
  attr_whitegold_round_default_img: String,
  attr_whitegold_round_img: String,
  attr_rosegold_round_default_img: String,
  attr_rosegold_round_img: String,
  attr_yellowgold_round_default_img: String,
  attr_yellowgold_round_img: String,
  attr_whitegold_yellow_round_default_img: String,
  attr_whitegold_yellow_round_img: String,
  attr_whitegold_rose_round_default_img: String,
  attr_whitegold_rose_round_img: String,
  attr_tricolor_round_default_img: String,
  attr_tricolor_round_img: String
});

const WeddingProduct = mongoose.model('WeddingProduct', weddingProductSchema);

module.exports = WeddingProduct;
