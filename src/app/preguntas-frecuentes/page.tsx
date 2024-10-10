import { Collapse, Loader } from "@/components";
import { navigation } from "@/constants";
import { getMetaobjects } from "@/requests";
import { Faq } from "@/types/Faq";

export async function generateMetadata() {
  return {
    title: "Preguntas Frecuentes",
    alternates: {
      canonical: `/${navigation.faq}`,
    },
    openGraph: {
      title: "Preguntas Frecuentes",
    },
  };
}

export default async function Page() {
  const data = await getMetaobjects("preguntas_frecuentes");

  return (
    <section className="faq min-h-[80vh] h-fit flex flex-col items-center justify-baseline pt-24">
      <h3 className="title-3 text-[1.75rem] my-10 text-center">
        Preguntas Frecuentes
      </h3>
      <Collapse
        items={data?.map((q: Faq) => {
          return {
            key: q.id,
            label: q.titulo,
            children: <p dangerouslySetInnerHTML={{ __html: q.contenido }} />,
          };
        })}
      />
    </section>
  );
}
