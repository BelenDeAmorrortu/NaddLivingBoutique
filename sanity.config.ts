import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import product from "./src/sanity/schemas/product-schema";
import sections from "./src/sanity/schemas/sections-schema";
import category from "./src/sanity/schemas/category-schema";
import faq from "./src/sanity/schemas/faq-schema";
import { deskStructure } from "./src/sanity/config/sanity-desk-structure";

const config = defineConfig({
  projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
  dataset: `${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
  title: "NADD living boutique",
  apiVersion: "2023-05-11",
  basePath: "/admin",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: [product, sections, category, faq],
  },
});

export default config;
