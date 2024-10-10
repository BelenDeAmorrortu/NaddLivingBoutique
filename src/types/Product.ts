export type Product = {
  _id: string;
  name: string;
  category: string[];
  url: string;
  lqip?: string[];
  images: string[];
  description: string;
  price: string;
  variants?: any;
};
