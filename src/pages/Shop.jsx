// src/components/Shop.js
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { supabase } from "../supabase";
import "../styles/Shop.css";

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, description, category, image");
  
    if (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } else {
      // Fetch all public URLs at once
      const updatedProducts = data.map((product) => ({
        ...product,
        imageUrl: supabase.storage.from("product-images").getPublicUrl(product.image).data.publicUrl ?? "/path/to/default.jpg",
      }));
  
      setProducts(updatedProducts);
    }
    setLoading(false);
  };
  
  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Function to get the image URL from Superbase Storage

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "default.jpg"; // Return a default image if no image path(Add the default image here)
    const { data, error } = supabase.storage
      .from("product-images")
      .getPublicUrl(imagePath); // Image path from the database

    if (error) {
      console.error("Error fetching public URL:", error);
      return "default.jpg"; // Fallback to a default image if error occurs
    }
    return data.publicUrl; // Return the public URL of the image
  };

  return (
    <div className="shop-page">
      <h2 className="shop-title">
        {selectedCategory ? selectedCategory : "All Products"}
      </h2>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-grid">
          {Array.from({ length: 18 }).map((_, idx) => (
            <div key={idx} className="empty-card">
              <div className="empty-image"></div>
              <div className="empty-text title"></div>
              <div className="empty-text price"></div>
            </div>
          ))}
          <div className="empty-message">
            <h3>No products found</h3>
            <p>Please check back later.</p>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => (e.target.src = "/path/to/default.jpg")}
              />

              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">Ksh {product.price}</p>
              <p className="product-description">{product.description}</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
