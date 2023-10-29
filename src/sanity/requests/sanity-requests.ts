import { createClient, groq } from "next-sanity";
import { Product } from "../../types/Product";
import clientConfig from "../config/client-config";
import imageUrlBuilder from "@sanity/image-url";
import { Faq } from "../../types/Faq";
import { searchProducts } from "@/utils/searchProducts";

export const client = createClient(clientConfig);
const builder = imageUrlBuilder(client);

export function sanityImage(url: string) {
  return builder.image(url);
}

export async function getProducts(
  filters: string[] | undefined,
  search: string | undefined
): Promise<Product[]> {
  const filterString =
    filters && filters?.length > 0
      ? `&& count((category[]->category)[@ in [${filters
          .map((filter) => `"${filter}"`)
          .join(", ")}]]) > 0
      `
      : "";

  const products = await client.fetch(
    groq`*[_type == 'product' ${filterString}]{
            _id,
            name,
            "category": category[]->category,
            "url": url.current,
            "images": images[].asset->url,
            "lqip": images[].asset->metadata.lqip,                
        }`
  );

  if (search && search.trim() !== "") {
    return searchProducts(search, products);
  } else {
    return products;
  }
}

export async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == 'product' && url.current == $slug][0]{
            name,
            "category": category[]->category,
            "images": images[].asset->url,
            "lqip": images[].asset->metadata.lqip,                
            description
        }`,
    { slug }
  );
}

export async function getSpotlight(): Promise<Product[]> {
  return await client.fetch(
    groq`*[_type == 'sections'][0]{
            spotlight[]->{
                _id,
                name,
                "category": category[]->category,
                "url": url.current,
                "images": images[].asset->url,
                "lqip": images[].asset->metadata.lqip,                
            }
        }.spotlight`
  );
}

export async function getCategories(): Promise<string[]> {
  const categories = await client.fetch(
    groq`*[_type == 'category']{
            category               
        }`
  );

  return categories.map((c: { category: string }) => c.category);
}

export async function getFaq(): Promise<Faq[]> {
  return await client.fetch(
    groq`*[_type == 'faq']{
            _id,
            question,
            answer               
        }`
  );
}
