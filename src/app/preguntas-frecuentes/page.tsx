"use client";
import { Loader } from "@/components";
import { PortableText } from "@portabletext/react";
import { CollapseProps } from "antd";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getMetaobjects } from "@/requests";

export default function Page() {
  const { data, isLoading } = useFetch(
    "faq",
    async () => await getMetaobjects("preguntas_frecuentes")
  );

  const [items, setItems] = useState<CollapseProps["items"]>([]);

  useEffect(() => {
    if (data) {
      setItems(
        data?.map((q) => {
          return {
            key: q.id,
            label: q.titulo,
            children: <p dangerouslySetInnerHTML={{ __html: q.contenido }} />,
          };
        })
      );
    }
  }, [data]);

  return (
    <div className="faq min-h-[80vh] h-fit flex flex-col items-center justify-center py-20">
      <h3 className="title-3 text-[1.75rem] my-10 text-center">
        Preguntas Frecuentes
      </h3>
      {isLoading ? (
        <div className="flex flex-col justify-evenly items-center m-20 h-32">
          <Loader size="medium" color="black" />
          <p>Cargando...</p>
        </div>
      ) : (
        <Collapse items={items} />
      )}
    </div>
  );
}