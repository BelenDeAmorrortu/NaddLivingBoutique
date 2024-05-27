import { ICartItem } from "./CartItem";
import { Product } from "./Product";
import { Variant } from "./Variant";

export interface ICartProvider {
  items: ICartItem[];
  total: number;
  addToCart: (product: Product, variant: Variant, amount: number) => void;
  removeFromCart: (itemId: string) => void;
  updateAmount: (itemId: string, amount: number) => void;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}
