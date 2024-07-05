"use client";
import Cart from "@/components/Cart";
import { createCart } from "@/requests";
import { ICartItem } from "@/types/CartItem";
import { ICartProvider } from "@/types/CartProvider";
import { Product } from "@/types/Product";
import { Variant } from "@/types/Variant";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CartContext = React.createContext<ICartProvider>({
  items: [],
  total: 0,
  count: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateAmount: () => {},
  setIsOpen: () => {},
  checkout: () => {},
  isOpen: false,
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({
  children: providerChildren,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = (product: Product, variant: Variant, amount: number) => {
    const findItem = cartItems.find(
      (i) => i.productId === product._id && i.variant.id === variant.id
    );
    if (findItem) {
      const updateItems = cartItems.map((item) =>
        item.productId === product._id && item.variant.id === variant.id
          ? { ...item, amount: item.amount + amount }
          : item
      );
      window.localStorage.setItem("cartItems", JSON.stringify(updateItems));
      setCartItems(updateItems);
      setTotal(calcTotal(updateItems));
      setCount(calcCount(updateItems));
      setIsOpen(true);
    } else {
      const item: ICartItem = {
        _id: uuidv4(),
        productId: product._id,
        name: product.name,
        variant,
        image: product.images[0],
        amount,
      };
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, item])
      );
      setCartItems([...cartItems, item]);
      setTotal(total + Number(variant.price) * amount);
      setCount(count + item.amount);
      setIsOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    const removed = cartItems.filter((p) => p._id !== id);
    window.localStorage.setItem("cartItems", JSON.stringify(removed));
    setCartItems(removed);
    setTotal(calcTotal(removed));
    setCount(calcCount(removed));
  };

  const updateAmount = (id: string, amount: number) => {
    const updated = cartItems.map((i) => {
      if (i._id === id) {
        return {
          ...i,
          amount,
        };
      } else {
        return i;
      }
    });
    window.localStorage.setItem("cartItems", JSON.stringify(updated));
    setCartItems(updated);
    setTotal(calcTotal(updated));
    setCount(calcCount(updated));
  };

  const calcTotal = (items: ICartItem[]) => {
    return items.reduce((total, item) => {
      return total + item.variant.price * item.amount;
    }, 0);
  };

  const calcCount = (items: ICartItem[]) => {
    return items.reduce((total, item) => {
      return total + item.amount;
    }, 0);
  };

  const checkout = async () => {
    await createCart(cartItems);
  };

  useEffect(() => {
    const savedItems = window.localStorage.getItem("cartItems");
    if (savedItems) {
      const parsed = JSON.parse(savedItems);
      setCartItems(parsed);
      setTotal(calcTotal(parsed));
      setCount(calcCount(parsed));
    }
  }, []);

  const values = {
    items: cartItems,
    total,
    addToCart,
    removeFromCart,
    isOpen,
    setIsOpen,
    updateAmount,
    count,
    checkout,
  };

  return (
    <CartContext.Provider value={values}>
      {providerChildren}
      <Cart
        isOpen={isOpen}
        close={() => {
          setIsOpen(false);
        }}
        items={cartItems}
        total={total}
        checkout={checkout}
      />
    </CartContext.Provider>
  );
}
