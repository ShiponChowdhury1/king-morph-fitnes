"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../data/data";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderProduct {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  date: string;
  products: OrderProduct[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: "Delivered" | "Confirmed" | "Processing" | "Shipped" | "Cancelled";
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  trackingId: string;
  trackingCourier: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearCart: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  orders: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string, reason: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultOrders: Order[] = [
  {
    id: "#12345",
    date: "Apr 5, 2026",
    products: [
      {
        productId: 1,
        name: "Gym Sets Clothe",
        image: "/images/shop/image-1 (1).png",
        quantity: 1,
        price: 249.99,
        size: "Color: Black",
        color: "Black"
      },
      {
        productId: 4,
        name: "FeatherForm Short Sleeve T-Shirt",
        image: "/images/shop/image-1 (4).png",
        quantity: 1,
        price: 299.99,
        size: "Size: XXL, Color: Black",
        color: "Black"
      }
    ],
    subtotal: 519.99,
    shippingCost: 29.99,
    tax: 0.00,
    total: 549.98,
    status: "Shipped",
    shippingAddress: {
      name: "John Smith",
      street: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
      phone: "+1 (555) 123-4567"
    },
    billingAddress: {
      name: "John Smith",
      street: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States"
    },
    paymentMethod: "Visa ending in 4242",
    trackingId: "FDX1234567890",
    trackingCourier: "FedEx",
    estimatedDelivery: "April 7, 2026"
  },
  {
    id: "#12346",
    date: "Apr 6, 2026",
    products: [
      {
        productId: 2,
        name: "Regular Fit V-Neck",
        image: "/images/shop/image-1 (2).png",
        quantity: 1,
        price: 1299.99,
        size: "Storage: 512GB, Color: Space Gray",
        color: "Space Gray"
      }
    ],
    subtotal: 1299.99,
    shippingCost: 0.00,
    tax: 0.00,
    total: 1299.99,
    status: "Confirmed",
    shippingAddress: {
      name: "John Smith",
      street: "456 Oak Street",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "United States",
      phone: "+1 (555) 987-6543"
    },
    billingAddress: {
      name: "John Smith",
      street: "456 Oak Street",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "United States"
    },
    paymentMethod: "PayPal (example@gmail.com)",
    trackingId: "FDX9876543210",
    trackingCourier: "FedEx",
    estimatedDelivery: "April 10, 2026"
  },
  {
    id: "#12347",
    date: "Apr 7, 2026",
    products: [
      {
        productId: 3,
        name: "Active Crop Top",
        image: "/images/shop/image-1 (3).png",
        quantity: 2,
        price: 139.98,
        size: "Size: L, Color: Navy Blue",
        color: "Navy Blue"
      }
    ],
    subtotal: 279.96,
    shippingCost: 0.00,
    tax: 0.00,
    total: 279.96,
    status: "Processing",
    shippingAddress: {
      name: "John Smith",
      street: "789 Pine Way",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
      phone: "+1 (555) 456-7890"
    },
    billingAddress: {
      name: "John Smith",
      street: "789 Pine Way",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States"
    },
    paymentMethod: "Visa ending in 4242",
    trackingId: "",
    trackingCourier: "",
    estimatedDelivery: "April 12, 2026"
  },
  {
    id: "#12354",
    date: "Apr 2, 2026",
    products: [
      {
        productId: 5,
        name: "Lightweight Runner Jacket",
        image: "/images/shop/image-1 (5).png",
        quantity: 1,
        price: 219.96,
        size: "Size: 9, Color: Black&Red",
        color: "Black&Red"
      }
    ],
    subtotal: 219.96,
    shippingCost: 0.00,
    tax: 0.00,
    total: 219.96,
    status: "Delivered",
    shippingAddress: {
      name: "John Smith",
      street: "101 Maple Ave",
      city: "Nashville",
      state: "TN",
      zip: "37201",
      country: "United States",
      phone: "+1 (555) 789-0123"
    },
    billingAddress: {
      name: "John Smith",
      street: "101 Maple Ave",
      city: "Nashville",
      state: "TN",
      zip: "37201",
      country: "United States"
    },
    paymentMethod: "Mastercard ending in 9876",
    trackingId: "FDX1122334455",
    trackingCourier: "FedEx",
    estimatedDelivery: "April 4, 2026"
  }
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    name: "Angelina Cherry",
    email: "example@gmail.com",
    avatar: "/images/profile-image.png",
    isLoggedIn: true,
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart/wishlist/orders/user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("kingmorph_cart");
      const storedWishlist = localStorage.getItem("kingmorph_wishlist");
      const storedOrders = localStorage.getItem("kingmorph_orders");
      const storedUser = localStorage.getItem("kingmorph_user");
      
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (e) {
          console.error("Error parsing cart", e);
        }
      }
      if (storedWishlist) {
        try {
          setWishlistItems(JSON.parse(storedWishlist));
        } catch (e) {
          console.error("Error parsing wishlist", e);
        }
      }
      if (storedOrders) {
        try {
          setOrders(JSON.parse(storedOrders));
        } catch (e) {
          console.error("Error parsing orders", e);
        }
      } else {
        setOrders(defaultOrders);
      }
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save cart/wishlist/orders/user to localStorage when updated
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("kingmorph_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("kingmorph_wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("kingmorph_orders", JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("kingmorph_user", JSON.stringify(user));
    }
  }, [user, isLoaded]);

  const addToCart = (product: Product, quantity = 1, size = "", color = "") => {
    const finalSize = size || (product.sizes && product.sizes[0]) || "Standard";
    const finalColor = color || (product.colors && product.colors[0]) || "Standard";

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === finalSize &&
          item.color === finalColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, size: finalSize, color: finalColor }];
      }
    });

    setCartOpen(true);
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const cancelOrder = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "Cancelled" as const }
          : order
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        user,
        setUser,
        orders,
        addOrder,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

