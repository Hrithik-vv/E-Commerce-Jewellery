import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from './api';

const CartContext = createContext();

const INITIAL_CART = [
  {
    id: 1,
    title: 'Diamond Ring',
    variant: '18K Gold / Solitaire',
    price: 499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=300',
    error: '',
  },
  {
    id: 3,
    title: 'Emerald Necklace',
    variant: '18K Yellow Gold / 18 Inch',
    price: 1299,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300',
    error: '',
  },
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [cartNotes, setCartNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const itemPrice = typeof product.price === 'number'
      ? product.price
      : parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0;

    const itemImage = product.image || product.productImage || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=300';
    const itemTitle = product.name || product.title || product.productName || 'Jewellery Item';

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => String(item.id) === String(product.id));
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: itemTitle,
            variant: product.variant || 'Standard',
            price: itemPrice,
            quantity: quantity,
            image: itemImage,
            error: '',
          },
        ];
      }
    });

    toast.success(`${itemTitle} added to cart!`);

    // Optionally sync with backend if logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      api.post('/cart/addcart', { productId: product.id, quantity }).catch(() => {
        // Silent fallback for guest/offline
      });
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.info('Item removed from cart.');
  };

  const updateQuantity = (id, newQty) => {
    const qty = Number(newQty);
    if (isNaN(qty) || qty < 1) {
      setCartItems((prev) =>
        prev.map((item) => (String(item.id) === String(id) ? { ...item, error: 'Quantity must be at least 1' } : item))
      );
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? { ...item, quantity: qty, error: '' } : item))
    );
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItemCount,
        subtotal,
        cartNotes,
        setCartNotes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
