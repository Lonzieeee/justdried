import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase'; 
import '../styles/About.css';
import aboutImage from '../../public/assets/about.jpg';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>Who We Are</h2>
        <p>
          Welcome to <strong>JustDried </strong>! We are dedicated to providing the best 
          organic and dried foods, ensuring quality, freshness, and sustainability in every product.
        </p>
        <p>
          Our journey began with a simple goal: to bring nature’s best flavors to your table while 
          supporting local farmers. We believe in healthy living, eco-friendly practices, and 
          delivering products that make a difference.
        </p>
        <p>
          Whether you're looking for delicious dried fruits, nutritious snacks, or farm-fresh 
          ingredients, we’ve got you covered!
        </p>
        <Link to="/contact" className="cta-button">Get in Touch</Link>
      </div>
      <div className="about-image">
        <img src={aboutImage} alt="About Us" />
      </div>
    </div>
  );
};

export default About;
