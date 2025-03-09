import React from 'react';
import { supabase } from '../supabase'; // Import Supabase client
import '../styles/FeaturedProducts.css'; // Import styles

const featuredProducts = [
  {
    id: 1,
    name: 'Roasted Peanuts (Groundnuts)',
    price: 'Ksh 250/500g',
    // Instead of importing from a URL, just store the filename from Supabase storage
    image: 'peanutsjpg.jpg', 
    description: 'Rich in protein and healthy fats, great for heart health.',
  },
  {
    id: 2,
    name: 'Cashew Nuts',
    price: 'Ksh 800/kg',
    image: 'cashews.jpg',
    description: 'Good for brain function, packed with antioxidants.',
  },
  {
    id: 3,
    name: 'Chickpeas',
    price: 'Ksh 400/kg',
    image: 'chickpeas.jpg',
    description: 'High in fiber and protein, great for digestion.',
  },
  {
    id: 4,
    name: 'Dried Mango Slices',
    price: 'Ksh 600/kg',
    image: 'dried-mango.jpg',
    description: 'Sweet and chewy, rich in Vitamin A for good eyesight.',
  },
  {
    id: 5,
    name: 'Dried Pineapple Chunks',
    price: 'Ksh 700/kg',
    image: 'dried-pineapple.jpg',
    description: 'Boosts digestion and supports immunity.',
  },
  {
    id: 6,
    name: 'Moringa Powder',
    price: 'Ksh 350/250g',
    image: 'moringa.jpg',
    description: 'A superfood rich in vitamins and antioxidants.',
  },
  {
    id: 7,
    name: 'Dried Omena',
    price: 'Ksh 300/500g',
    image: 'dried-omena.jpg',
    description: 'High in Omega-3, essential for brain health.',
  },
];

// Helper function to get the public URL for Supabase storage assets
const getImageUrl = (imagePath) => {
  // If the imagePath is already a full URL (for local assets imported via webpack), return it as-is.
  if (typeof imagePath === 'string' && imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, treat the imagePath as a file in Supabase storage
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

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={getImageUrl(product.image)} 
              alt={product.name} 
              className="product-image" 
            />
            <h3>{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
