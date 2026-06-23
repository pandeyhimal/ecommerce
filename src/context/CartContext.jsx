import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Load the saved cart from localStorage right when the app starts
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Automatically save to localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
      setCart([...cart]); 
    } else {
      // Cleanly add the product object and its quantity together
      const newItem = { ...product, quantity: quantity };
      setCart([...cart, newItem]); 
    }
  };

  const removeFromCart = (productId) => {
  // Filter out the item with the matching ID
  const updatedCart = cart.filter((item) => item.id !== productId);
  setCart(updatedCart);
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
