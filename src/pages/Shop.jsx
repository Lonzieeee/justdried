import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { supabase } from '../supabase';
import '../styles/Shop.css';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        console.log('Fetched products:', data);
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filter by category (if selected)
  const filteredProducts = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;

  // Function to construct Supabase storage image URL
  const getImageUrl = (imagePath) => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const { data, error } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(cleanPath);
    if (error) {
      console.error('Error fetching public URL:', error);
      return null;
    }
    return data.publicUrl;
  };

  return (
      <div className="shop-page">
        <h2 className="shop-title">{selectedCategory ? selectedCategory : 'All Products'}</h2>
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
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => (e.target.src = getImageUrl('default.jpg'))}
                    />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">Ksh {product.price}</p>
                    <p className="product-description">{product.description}</p>
                    <button className="add-to-cart" onClick={() => addToCart(product)}>
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
