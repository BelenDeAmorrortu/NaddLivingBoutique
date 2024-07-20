import { getProduct } from "../../../requests/index";
import { Carousel, ContactButtons } from "@/components";
import { navigation } from "@/constants/navigation";
import AddToCartProductForm from "@/components/AddToCartProductForm";

type Props = {
  params: { product: "string" };
};

export async function generateMetadata({ params }: Props) {
  try {
    const { product } = params;

    const { name, category } = await getProduct(product);

    if (!name) throw Error("product not found");
    return {
      title: `${category[0][0].toUpperCase() + category[0].slice(1)} ${name}`,
      alternates: {
        canonical: `${navigation.productos}/${product}`,
      },
      openGraph: {
        title: `${category[0][0].toUpperCase() + category[0].slice(1)} ${name}`,
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

export default async function page({ params }: Props) {
  const slug = params.product;
  const product = await getProduct(slug);

  return (
    <div className="flex flex-col h-fit w-full px-10">
      <div className="description flex flex-col md:flex-row h-fit pb-10 pt-32 gap-10 justify-between items-center">
        <div className="mb-12 w-[95vw] sm:mb-0 md:w-[50vw] md:sticky md:top-32 min-[1243px]:w-[45vw] md:self-baseline">
          <Carousel images={product.images} lqip={product.lqip} />
        </div>
        <div className="w-[90vw] md:w-[45vw] flex flex-col justify-center">
          <h1 className="title-3 text-red">{product.name}</h1>
          <h2 className="subtitle-1 my-5">{product.category.join(" - ")}</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <AddToCartProductForm {...{ product }} />
        </div>
      </div>
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-between items-center w-full h-fit my-10">
        <div className="flex flex-col w-[90vw] md:max-w-[45vw] gap-4">
          <h4 className="text-2xl md:text-[2.4vw] text-nowrap font-bold text-red">
            ¿Querés tu producto a medida?
          </h4>
          <h5 className="text-lg md:text-[1.8vw] flex-row-center w-full text-nowrap">
            <span className="flex flex-1">Contactanos en nuestras redes</span>
          </h5>
        </div>
        <div className="flex flex-col flex-1 w-[90vw] md:max-w-[40vw]">
          <ContactButtons />
        </div>
      </div>
    </div>
  );
}
