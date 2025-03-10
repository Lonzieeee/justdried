import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contact.css";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); //to track if th form has been submitted starts as false 
  const navigate = useNavigate();

//FORM SUBMISION HANDLER

  const handleSubmit = (e) => { //trigered when user clicks send message
    e.preventDefault(); //PREVENT DEFAULT FORM SUBMISSION
   
    setIsSubmitted(true); //update to indicate that the form has beeen submitted

    
    alert("Message sent successfully! Our team will get back to you shortly Happy Shopping!");

    // Redirect to homepage after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Feel free to reach out.</p>

      <div className="contact-content">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        {/* Contact Details */}
        <div className="contact-details">
          <h3>Get in Touch</h3>
          <p><strong>Email:</strong> support@justdried.com</p>
          <p><strong>Phone:</strong> +254 712 345 678</p>
          <p><strong>Location:</strong> Chandaria - Nairobi, Kenya</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;