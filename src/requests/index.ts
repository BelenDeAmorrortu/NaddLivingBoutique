import { Product } from "@/types/Product";
import { ICartItem } from "@/types/CartItem";
import { Fabric } from "@/types/Fabric";
import { axiosInstance } from "@/app/api/(helpers)/axiosInstance";

export const getProducts = async (
  filters: string[],
  search: string | undefined,
  cursor: string | undefined
): Promise<Product[]> => {
  try {
    const { data } = await axiosInstance.get(
      "/products" + `?filters=${filters}${search ? `&search=${search}` : ""}`
    );

    return data;
  } catch (e) {
    console.log("ERROR", e);
    return [];
  }
};

export const getProduct = async (handle: string): Promise<Product> => {
  try {
    const { data } = await axiosInstance.get("/products/" + handle);

    return data;
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
    const { data } = await axiosInstance.get("/spotlight");

    return data;
  } catch (e) {
    console.log("ERROR", e);
    return [];
  }
};

export const getMetaobject = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      `metaobject?id=${encodeURIComponent(id)}`
    );

    return data;
  } catch (e) {
    console.log("ERROR", e);
    return "0";
  }
};

export const getMetaobjects = async (type: string) => {
  try {
    const { data } = await axiosInstance.get("/metaobjects/" + type);

    return data;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const getImageUrl = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      "/images?id=" + encodeURIComponent(id)
    );
    return data.url;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const getFabrics = async (): Promise<Fabric[]> => {
  try {
    const { data } = await axiosInstance.get("/fabrics");
    return data;
  } catch (e) {
    console.log("ERROR", e);
    return [];
  }
};

export const createCart = async () => {
  try {
    const { data } = await axiosInstance.post("/cart/create");

    return data;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const getCart = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(
      "/cart?id=" + encodeURIComponent(id)
    );

    return data;
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

    const { data } = await axiosInstance.post("/cart/add", {
      id,
      products,
    });

    return data;
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

    const { data } = await axiosInstance.put("/cart/update", {
      id,
      products,
    });

    return data;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const removeCartItems = async (id: string, productIds: string[]) => {
  try {
    const { data } = await axiosInstance.put("/cart/remove", {
      id,
      productIds,
    });

    return data;
  } catch (e) {
    console.log("ERROR", e);
  }
};

export const updateFabric = async (id: string, observations?: string) => {
  try {
    const { data } = await axiosInstance.put("/cart/update/observations", {
      id,
      observations,
    });

    return data;
  } catch (e) {
    console.log("ERROR", e);
  }
};
