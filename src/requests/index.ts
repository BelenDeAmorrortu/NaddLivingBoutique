import { Product } from "@/types/Product";
import { storefront } from "@/utils/storefront";
import { queries } from "../constants/queries";
import { isJsonString } from "@/utils/isJsonString";
import { arrayToIdsObject } from "@/utils/arrayToIdsObject";
import { getMinPrice } from "@/utils/getMinPrice";

export const getProducts = async (
  filters: string[],
  search: string | undefined,
  cursor: string | undefined
): Promise<Product[]> => {
  try {
    const { data } = await storefront(queries.products, {
      cursor: cursor ?? null,
      filter:
        filters.length === 1 && !search
          ? filters[0]
          : filters.length > 1 && search
          ? filters
              .map((f) => `${f}`)
              .join(" OR ")
              .concat(search ? ` AND ${search}` : "")
          : search
          ? search
          : null,
    });
    const products = data.products.edges.map((p: any) => {
      const { title, id, handle, images, descriptionHtml, variants, tags } =
        p.node;

      return {
        _id: id,
        images: images.edges.map((i: any) => i.node.url),
        category: tags,
        description: descriptionHtml,
        url: handle,
        name: title,
        lqip: images.edges.map(
          (i: any) => i.node.url + "?blur=500&px=16&auto=format"
        ),
        price: getMinPrice(variants.nodes),
      };
    });

    return products;
  } catch (e) {
    console.log("ERROR", e);
    return [];
  }
};

export const getProduct = async (handle: string): Promise<Product> => {
  try {
    const { data } = await storefront(queries.product, { handle });

    const { title, id, tags, images, descriptionHtml, variants } =
      data.productByHandle;

    return {
      _id: id,
      images: images.edges.map((i: any) => i.node.url),
      category: tags,
      description: descriptionHtml,
      url: handle,
      name: title,
      lqip: images.edges.map(
        (i: any) => i.node.url + "?blur=500&px=16&auto=format"
      ),
      price: getMinPrice(variants.nodes),
      variants: variants.nodes,
    };
  } catch (e) {
    console.log("ERROR", e);
    return {
      _id: "",
      name: "",
      category: [],
      url: "",
      lqip: [],
      images: [],
      description: "",
      price: "",
    };
  }
};

export const getSpotlight = async (): Promise<Product[]> => {
  try {
    const { data } = await storefront(queries.spotlight, {
      collection: "Spotlight",
    });

    return data.collectionByHandle.products.edges.map((p: any) => {
      const { title, id, tags, handle, images, descriptionHtml, variants } =
        p.node;

      return {
        _id: id,
        images: images.edges.map((i: any) => i.node.url),
        category: tags,
        description: descriptionHtml,
        url: handle,
        name: title,
        lqip: images.edges.map(
          (i: any) => i.node.url + "?blur=500&px=16&auto=format"
        ),
        price: getMinPrice(variants.nodes),
      };
    });
  } catch (e) {
    console.log("ERROR", e);
    return [];
  }
};

export const getMetaobject = async (id: string) => {
  try {
    const { data } = await storefront(queries.metaobject, { id });

    const values = data.metaobject.fields.reduce(
      (acc: any, current: any) => {
        acc[current.key] = isJsonString(current.value)
          ? JSON.parse(current.value)
          : current.value;
        return acc;
      },
      { id: data.metaobject.id }
    );

    return values;
  } catch (e) {
    console.log("ERROR", e);
    return "0";
  }
};

export const getMetaobjects = async (type: string) => {
  try {
    const { data } = await storefront(queries.metaobjects, { type });
    const metaobjectsValuesPromises = data.metaobjects.edges.map((o: any) => {
      return getMetaobject(o.node.id);
    });

    const metaobjectsValues = await Promise.all(metaobjectsValuesPromises);
    return metaobjectsValues;
  } catch (e) {
    console.log("ERROR", e);
  }
};