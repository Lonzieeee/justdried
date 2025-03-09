import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase"; // Import Supabase

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from Supabase on page load
  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } = await supabase.from("cart").select("*");
      if (error) console.error("Error fetching cart:", error);
      else setCart(data);
    };
    fetchCart();
  }, []);

  // Add item to cart and save in Supabase
  const addToCart = async (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      await supabase.from("cart").update({ quantity: existingItem.quantity + 1 }).match({ id: product.id });
    } else {
      const newItem = { ...product, quantity: 1 };
      setCart([...cart, newItem]);
      await supabase.from("cart").insert([newItem]);
    }
  };

  // Remove item from cart in Supabase
  const removeFromCart = async (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    await supabase.from("cart").delete().match({ id: productId });
  };

  // Clear cart in Supabase
  const clearCart = async () => {
    setCart([]);
    await supabase.from("cart").delete();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
