import React from "react";
import { PortableTextBlock } from "sanity";

export type Product = {
  _id: string;
  name: string;
  category: string[];
  url: string;
  lqip: string[];
  images: string[];
  description: string;
  price: string;
  variants?: any;
};
