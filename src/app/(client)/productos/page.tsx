"use client";

import { Card, Loader, Pagination } from "@/components";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getProducts } from "../../../../sanity/sanity-utils";
import { Product } from "../../../../types/Product";
import { useSearchParams } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { categories } from "@/utils/categories";
import { navigation } from "@/utils/navigation";
import { FiInfo } from "react-icons/fi";
import { BiErrorCircle } from "react-icons/bi";

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

  // Products and filtration
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<string[]>();
  const [search, setSearch] = useState<string | undefined>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [amountPerPage, setAmountPerPage] = useState(12);
  const indexOfLastOfPage = currentPage * amountPerPage;
  const indexOfFirstOfPage = indexOfLastOfPage - amountPerPage;
  const currentProducts = products.slice(indexOfFirstOfPage, indexOfLastOfPage);

  const { isPlaceholderData, error, data, refetch } = useQuery({
    queryFn: () => getProducts(filters ? filters : [], search),
    placeholderData: [],
    enabled: filters === undefined ? false : true,
  });

  useEffect(() => {
    setFilters(
      params.getAll("filter").length === 0 ? [] : params.getAll("filter")
    );
    setSearch(
      params.getAll("search").length === 0 ? "" : params.getAll("search")[0]
    );
    () => {
      setFilters(undefined);
      setSearch(undefined);
    };
  }, [params]);

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  useEffect(() => {
    if (filters !== undefined) {
      refetch();
      setCurrentPage(1);
    }
  }, [filters]);

  useEffect(() => {
    if (search === undefined) {
      setParams(filters ?? []);
    }
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  function setParams(filterArray: string[]) {
    const queries = filterArray?.map((f) => `filter=${f}`).join("&");
    router.push(
      `${navigation.productos}?${queries ?? ""}${
        search ? `&search=${search}` : ""
      }`
    );
  }

  function addFilter(s: string) {
    if (filters) {
      filters?.includes(s) ? null : setParams([...filters, s]);
    }
  }
  function removeFilter(s: string) {
    if (filters) {
      setParams(filters?.filter((f) => f !== s));
    }
  }

  return (
    <div className="min-h-[60vh] my-36 w-full flex flex-col items-center sm:flex-row sm:justify-around sm:items-start">
      <div className=" w-[85%] sm:w-48 md:w-56 lg:mx-12 space-y-2 sm:mt-10">
        <h4 className="subtitle-1 font-bold">Filtros</h4>
        <ul className="border-b-2 border-grey-hover py-3 flex flex-wrap w-full">
          {filters?.map((f) => (
            <li className="cursor-pointer py-1 px-2 bg-grey-hover max-w-min rounded-sm flex items-center capitalize mr-2 my-2">
              {f}
              <XMarkIcon
                onClick={() => removeFilter(f)}
                className="w-4 h-4 ml-1 hover:stroke-red"
              />
            </li>
          ))}
        </ul>
        <h4 className="title-4">Categoría</h4>
        <ul className="border-b-2 border-grey-hover pb-3 w-full">
          {categories.map((f) => (
            <li
              onClick={() => addFilter(f)}
              className=" text-black cursor-pointer capitalize hover:text-red w-fit"
            >
              {f}
            </li>
          ))}
        </ul>
        {search !== "" || search ? (
          <>
            <h4 className="title-4">Búsqueda</h4>
            <ul className="border-b-2 border-grey-hover pb-3 w-full">
              <li
                onClick={() => {}}
                className=" cursor-pointer py-1 px-2 w-fit bg-grey-hover rounded-sm flex items-center capitalize mr-2 my-2"
              >
                {search}
                <XMarkIcon
                  onClick={() => setSearch(undefined)}
                  className="w-4 h-4 ml-1 hover:stroke-red"
                />
              </li>
            </ul>
          </>
        ) : null}
      </div>
      <div className="flex-col-center min-h-[60vh] max-[370px]:w-[235px] w-[360px] sm:w-[380px] md:w-[465px] lg:w-[660px] min-[1336px]:w-[990px]">
        {error ? (
          <p className="flex-row-center">
            <BiErrorCircle className="w-6 h-6 mr-7 text-red" /> Hubo un error
          </p>
        ) : isPlaceholderData && products.length === 0 ? (
          <div className="flex-col-center space-y-5">
            <Loader size="small" color="black" />
            <p>Cargando...</p>
          </div>
        ) : !isPlaceholderData && products.length === 0 ? (
          <p className="flex-row-center">
            <FiInfo className="w-6 h-6 mr-7" /> No se encontraron resultados
          </p>
        ) : (
          <div className="flex flex-wrap w-full">
            {currentProducts.map((p) => (
              <Card {...p} />
            ))}
          </div>
        )}
        <Pagination
          visible={!(isPlaceholderData || products.length === 0)}
          current={currentPage}
          setCurrent={setCurrentPage}
          products={products.length}
          productsPerPage={amountPerPage}
        />
      </div>
    </div>
  );
}
