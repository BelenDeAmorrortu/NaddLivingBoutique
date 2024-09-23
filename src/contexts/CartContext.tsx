"use client";
import Cart from "@/components/Cart";
import {
  addCartItems,
  createCart,
  getCart as getShopifyCart,
  removeCartItems,
  updateCartItems,
  updateFabric,
} from "@/requests";
import { ICartItem } from "@/types/CartItem";
import { ICartProvider } from "@/types/CartProvider";
import { Product } from "@/types/Product";
import { Variant } from "@/types/Variant";
import React, { useContext, useEffect, useState } from "react";

const CartContext = React.createContext<ICartProvider>({
  items: [],
  total: 0,
  count: 0,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateAmount: async () => {},
  setIsOpen: () => {},
  checkout: (fabric?: string) => {},
  isOpen: false,
  loading: false,
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({
  children: providerChildren,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any>();
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function parseCartItem(cartLines: any) {
    return cartLines.edges.map((edge: any) => {
      const node = edge.node;
      const merchandise = node.merchandise;

      return {
        _id: node.id,
        productId: merchandise.product.id,
        name: merchandise.product.title,
        variant: {
          id: merchandise.id,
          title: merchandise.title,
          price: merchandise.price.amount,
        },
        image: merchandise.product.featuredImage.url,
        amount: node.quantity,
        url: merchandise.product.handle,
      };
    });
  }

  const addToCart = async (
    product: Product,
    variant: Variant,
    amount: number
  ) => {
    if (cart) {
      setLoading(true);
      const findItem = cartItems.find(
        (i) => i.productId === product._id && i.variant.id === variant.id
      );
      if (findItem) {
        const updateItems = cartItems.map((item) =>
          item.productId === product._id && item.variant.id === variant.id
            ? { ...item, amount: item.amount + amount }
            : item
        );
        const updatedCart = await updateCartItems(cart.id, updateItems);
        if (updatedCart) setCart(updatedCart);
        setIsOpen(true);
      } else {
        const item: ICartItem = {
          _id: "",
          productId: product._id,
          name: product.name,
          variant,
          image: product.images[0],
          amount,
          url: product.url,
        };
        const updatedCart = await addCartItems(cart.id, [item]);
        if (updatedCart) setCart(updatedCart);
        setLoading(false);
        setIsOpen(true);
      }
    }
  };

  const removeFromCart = async (id: string) => {
    if (cart) {
      const updatedCart = await removeCartItems(cart.id, [id]);
      if (updatedCart) setCart(updatedCart);
    }
  };

  const updateAmount = async (id: string, amount: number) => {
    if (cart) {
      setLoading(true);
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
      const updatedCart = await updateCartItems(cart.id, updated);
      if (updatedCart) setCart(updatedCart);
      setLoading(false);
    }
  };

  const checkout = async (fabric?: string) => {
    if (cart) {
      setLoading(true);
      if (fabric) await updateFabric(cart.id, fabric);
      setLoading(false);
      return window.open(cart?.checkoutUrl);
    }
  };

  const getCart = async () => {
    const savedCartId = window.localStorage.getItem("cartId");

    if (!savedCartId) {
      createShopifyCart();
    } else {
      const updatedCart = await getShopifyCart(savedCartId);
      if (updatedCart) setCart(updatedCart);
      else if (updatedCart === null) {
        window.localStorage.removeItem("observations");
        createShopifyCart();
      }
    }
  };

  const createShopifyCart = async () => {
    const updatedCart = await createCart();
    if (updatedCart) {
      window.localStorage.setItem("cartId", updatedCart?.id);
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cart) {
      if (cart?.lines) setCartItems(parseCartItem(cart.lines));
      setCount(cart?.totalQuantity ?? 0);
      setTotal(Number(cart?.cost?.totalAmount.amount) ?? 0);
    }
  }, [cart]);

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
    loading,
  };

  return (
    <CartContext.Provider value={values}>
      {providerChildren}
      <Cart
        loading={loading}
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
