"use client";
import { Loader } from "@/components";
import { PortableText } from "@portabletext/react";
import { CollapsePanelProps, CollapseProps } from "antd";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getFaq } from "../../../../sanity/sanity-utils";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}

export function Content() {
  const { isPlaceholderData, error, data } = useQuery({
    queryFn: () => getFaq(),
    placeholderData: [],
  });

  const [items, setItems] = useState<CollapseProps["items"]>([]);

  useEffect(() => {
    if (data) {
      setItems(
        data?.map((q) => {
          return {
            key: q._id,
            label: q.question,
            children: <PortableText value={q.answer} />,
          };
        })
      );
    }
  }, [data]);

  return (
    <div className="faq min-h-[80vh] h-fit flex flex-col items-center justify-center py-20">
      <h3 className="title-3 my-10 text-center">Preguntas Frecuentes</h3>
      {isPlaceholderData && data?.length === 0 ? (
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
