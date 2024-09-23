import { ICartItem } from "./CartItem";
import { Product } from "./Product";
import { Variant } from "./Variant";

export interface ICartProvider {
  items: ICartItem[];
  total: number;
  count: number;
  addToCart: (
    product: Product,
    variant: Variant,
    amount: number
  ) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateAmount: (itemId: string, amount: number) => Promise<void>;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  checkout: (fabric?: string) => void;
  loading: boolean;
}
