import { Product } from "@/types/Product";
import { storefront } from "@/utils/storefront";
import { queries } from "../constants/queries";
import { isJsonString } from "@/utils/isJsonString";
import { getMinPrice } from "@/utils/getMinPrice";
import { ICartItem } from "@/types/CartItem";
import { Fabric } from "@/types/Fabric";

export const getProducts = async (
  filters: string[],
  search: string | undefined,
  cursor: string | undefined
): Promise<Product[]> => {
  try {
    const { data } = await storefront(queries.products, {
      cursor: cursor ?? null,
      filter:
        filters.length > 0
          ? filters
              .map((f) => `tag:${f}`)
              .join(" OR ")
              .concat(search ? ` AND (title:${search}* OR tag:${search}*)` : "")
          : search
          ? `(tag:${search}* OR title:${search}*)`
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

    const parseVariants = variants.nodes.map((v: any) => {
      return {
        ...v,
        price: v.price.amount,
      };
    });

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
      variants: parseVariants,
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

export const getImageUrl = async (id: string) => {
  try {
    const { data } = await storefront(queries.imageReferenceURL, { id });
    return data.node.image.url;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const getFabrics = async (): Promise<Fabric[]> => {
  try {
    const { data } = await storefront(queries.metaobjects, { type: "telas" });
    const metaobjectsValuesPromises = data.metaobjects.edges.map((o: any) => {
      return getMetaobject(o.node.id);
    });

    const metaobjectsValues = await Promise.all(metaobjectsValuesPromises);

    const { data: colors } = await storefront(queries.metaobjects, {
      type: "color_tela",
    });
    const colorsPromises = colors.metaobjects.edges.map(async (o: any) => {
      const data = await getMetaobject(o.node.id);
      const image = await getImageUrl(data.foto);
      return {
        ...data,
        foto: image,
      };
    });

    const colorsValues = await Promise.all(colorsPromises);

    const fabrics = metaobjectsValues.map((f) => {
      const colors = colorsValues.filter((c) => c.tipo_tela === f.id);
      return {
        ...f,
        colores: colors,
      };
    });

    return fabrics;
  } catch (e) {
    console.log("ERROR", e);
    return [];
  }
};

export const createCart = async () => {
  try {
    const { data } = await storefront(queries.createCart, {
      products: [],
      attributes: [{ key: "custom.fabric", value: "-" }],
    });

    return data.cartCreate.cart;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const getCart = async (id: string) => {
  try {
    const { data } = await storefront(queries.getCart, {
      id,
    });

    return data.cart;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const addCartItems = async (id: string, cartItems: ICartItem[]) => {
  try {
    const products = cartItems.map((i) => {
      return {
        quantity: i.amount,
        merchandiseId: i.variant.id,
      };
    });
    const { data } = await storefront(queries.addCart, {
      id,
      products,
    });

    return data.cartLinesAdd.cart;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const updateCartItems = async (id: string, cartItems: ICartItem[]) => {
  try {
    const products = cartItems.map((i) => {
      return {
        quantity: i.amount,
        id: i._id,
      };
    });
    const { data } = await storefront(queries.updateCart, {
      id,
      products,
    });

    return data.cartLinesUpdate.cart;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const removeCartItems = async (id: string, productIds: string[]) => {
  try {
    const { data } = await storefront(queries.removeCart, {
      id,
      productIds,
    });

    return data.cartLinesRemove.cart;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const updateFabric = async (id: string, fabric?: string) => {
  try {
    const { data } = await storefront(queries.updateCartAttributes, {
      id,
      attributes: [{ key: "custom.fabric", value: fabric ?? "-" }],
    });

    return true;
  } catch (e) {
    console.log("ERROR", e);
  }
};
