"use client";

import { Card, Pagination } from "@/components";
import { useEffect, useLayoutEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getProducts } from "../../../../sanity/sanity-utils";
import { Product } from "../../../../types/Product";
import { useSearchParams } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}

function Content() {
  const router = useRouter();
  const params = useSearchParams();

  const { isPlaceholderData, error, data } = useQuery({
    queryFn: getProducts,
    placeholderData: [],
  });

  // Products and filtration
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [amountPerPage, setAmountPerPage] = useState(12);
  const indexOfLastOfPage = currentPage * amountPerPage;
  const indexOfFirstOfPage = indexOfLastOfPage - amountPerPage;
  const currentProducts = products.slice(indexOfFirstOfPage, indexOfLastOfPage);

  const dataFilters = ["sillón", "silla", "sofá", "mesa", "puff"];

  useLayoutEffect(() => {
    setFilters(!params.getAll("filter").length ? [] : params.getAll("filter"));
  }, [params, setFilters]);

  useEffect(() => {
    if (data)
      setProducts(
        filters.length > 0
          ? data.filter((p) => filters.includes(p.category))
          : data
      );
    const queries = filters.map((f) => `filter=${f}`).join("&");
    router.push(`/productos?${queries}`);
    setCurrentPage(1);
  }, [filters, data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  function addFilter(s: string) {
    filters.includes(s) ? null : setFilters([...filters, s]);
  }
  function removeFilter(s: string) {
    setFilters(filters.filter((f) => f !== s));
  }

  return (
    <div className="min-h-[60vh] my-36 w-full flex flex-col items-center sm:flex-row sm:justify-around sm:items-start">
      <div className=" w-[85%] sm:w-48 md:w-56 space-y-2 sm:mt-10">
        <h4 className="subtitle-1 font-bold">Filtros</h4>
        <ul className="border-b-2 border-grey-hover py-3 flex flex-wrap w-full">
          {filters.map((f) => (
            <li className="cursor-pointer py-1 px-2 bg-grey-hover max-w-min rounded-sm flex items-center capitalize mr-2 my-2">
              {f}
              <XMarkIcon
                onClick={() => removeFilter(f)}
                className="w-4 h-4 ml-1 hover:stroke-red"
              />
            </li>
          ))}
        </ul>
        <h4 className="title-3">Categoría</h4>
        <ul className="border-b-2 border-grey-hover pb-3 w-full">
          {dataFilters.map((f) => (
            <li
              onClick={() => addFilter(f)}
              className=" text-black cursor-pointer capitalize hover:text-red w-fit"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-col-center min-h-[60vh] w-[360px] sm:w-[380px] md:w-[465px] lg:w-[1080px]">
        {error ? (
          <p>Hubo un error</p>
        ) : isPlaceholderData && products.length === 0 ? (
          <p>Cargando...</p>
        ) : !isPlaceholderData && products.length === 0 ? (
          <p>No hay productos en esta categoría</p>
        ) : (
          <div className="flex flex-wrap w-full">
            {currentProducts.map((p) => (
              <Card {...p} />
            ))}
          </div>
        )}
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          products={products.length}
          productsPerPage={amountPerPage}
        />
      </div>
    </div>
  );
}
