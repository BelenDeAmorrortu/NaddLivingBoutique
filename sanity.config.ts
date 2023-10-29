import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import product from "./sanity/schemas/product-schema";
import sections from "./sanity/schemas/sections-schema";
import category from "./sanity/schemas/category-schema";
import faq from "./sanity/schemas/faq-schema";
import { deskStructure } from "./sanity/sanity-desk-structure";

const config = defineConfig({
  projectId: "83r3ol58",
  dataset: "dev",
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
