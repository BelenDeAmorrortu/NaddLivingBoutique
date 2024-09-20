import axios from "axios";
export const storefront = async (query: string, variables = {}) => {
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_URL ?? "",
      JSON.stringify({ query, variables }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN ?? "",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return {
      data: undefined,
      error: error,
    };
  }
};
