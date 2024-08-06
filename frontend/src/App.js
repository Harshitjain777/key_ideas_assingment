
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pageNo, setPageNo] = useState(0);
  const [products, setProducts] = useState([]);
  const [sortedProducts,setSortedProducts]= useState([]);
  const [filter, setFilter] = useState('Both');
  const [isSortSelected,setIsSortSelected]=useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 7000]); // Initial price range

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/wedding-products/getproducts?page=${page}`);
      setProducts(response.data.products);
      setPageNo(page);
      const totalPages = Math.ceil(response.data.total / 12);
      setTotalPage(totalPages);
    } catch (error) {
      console.error('Error fetching the products', error);
    }
  };
  
  console.log("filter button and products : ",isSortSelected,sortedProducts);
  
  useEffect(() => {
    fetchProducts(0);
  }, []);
  
 
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const handleFetchMore = (val) => {
    fetchProducts(val);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange([0, value]);
  };

  const filteredProducts = products.filter((product) => {
    if (filter !== 'Both' && product.prodmeta_section !== filter) {
      return false;
    }
    return product.attr_14k_regular >= priceRange[0] && product.attr_14k_regular <= priceRange[1];
  });

  const sortProducts = () => {
    let sorted = [...filteredProducts]; // Create a copy of the products array
    if (isSortSelected === 'LtoH') {
      sorted.sort((a, b) => a.attr_14k_regular - b.attr_14k_regular);
    } else if (isSortSelected === 'HtoL') {
      // Sort descending
      sorted.sort((a, b) => b.attr_14k_regular - a.attr_14k_regular);
    } else {
      sorted = [];
    }
    setSortedProducts(sorted);
  }
  
  useEffect(()=>{
    sortProducts();
  },[isSortSelected,filteredProducts])

  return (
    <div className="container">
      <h1>Wedding Products</h1>
      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === 'Mens' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Mens')}
        >
          Men
        </button>
        <button
          className={`filter-button ${filter === 'Womens' ? 'active' : ''}`}
          onClick={() =>{ handleFilterChange('Womens')}}
        >
          Women
        </button>
        <button
          className={`filter-button ${filter === 'Both' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Both')}
        >
          Both
        </button>

        <button
        className={`filter-button ${isSortSelected === 'HtoL' ? 'active' : ''}`}
         onClick={()=>{
        if(isSortSelected=='HtoL'){
          setIsSortSelected(null)
        }
        else{

        setIsSortSelected("HtoL")}
        }}
        >
          Price High To Low
        </button>

        <button className={`filter-button ${isSortSelected === 'LtoH' ? 'active' : ''}`} onClick={()=>{
          if(isSortSelected=='LtoH'){
            setIsSortSelected(null)
          }
          else{
          setIsSortSelected('LtoH')
          }
          
          }}>
          Price Low To High
        </button>


      </div>

      <div className="price-filter">
        <label>
          <span>Price:&#8377;{priceRange[1]}</span>
          <input
            type="range"
            min="0"
            max="7000"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
        </label>
      </div>


{isSortSelected ?
      <div className="product-list">
        {sortedProducts.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.prod_name}</h2>
            <p>{product.prod_long_desc}</p>
            <p>For: {product.prodmeta_section}</p>
            <p>Type: {product.prod_type}</p>
            <p>Category: {product.prod_subcategory}</p>
            <p>Price: {product.attr_14k_regular}</p>
            <p>Ship Days: {product.prodmeta_ship_days}</p>
          </div>
        ))}
      </div>:
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.prod_name}</h2>
            <p>{product.prod_long_desc}</p>
            <p>For: {product.prodmeta_section}</p>
            <p>Type: {product.prod_type}</p>
            <p>Category: {product.prod_subcategory}</p>
            <p>Price: {product.attr_14k_regular}</p>
            <p>Ship Days: {product.prodmeta_ship_days}</p>
          </div>
        ))}
      </div>}

      <div className='pagination'>
        {Array.from({ length: totalPage }, (_, index) => index + 1).map((val) => (
          <button key={val} onClick={() => { handleFetchMore(val - 1) }}>{val}</button>
        ))}
      </div>
    </div>
  );
};

export default App;
