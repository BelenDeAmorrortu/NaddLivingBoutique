"use client";
import { Card, Filters, Loader, Pagination } from "@/components";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getProducts } from "../../../sanity/requests/sanity-requests";
import { Product } from "../../../types/Product";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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

  const {
    isPlaceholderData,
    error,
    data: productData,
    refetch,
  } = useQuery({
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
    const page = Number(params.get("page"));
    setCurrentPage(page == 0 ? 1 : page);

    () => {
      setFilters(undefined);
      setSearch(undefined);
    };
  }, [params]);

  useEffect(() => {
    if (productData) setProducts(productData);
  }, [productData]);

  useEffect(() => {
    if (filters !== undefined) {
      refetch();
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

  function setParams(filterArray: string[], page?: number) {
    const queries = filterArray?.map((f) => `filter=${f}`).join("&");

    const url = `${navigation.productos}?${queries ?? ""}${
      search ? `&search=${search}` : ""
    }&page=${page ?? 1}`;

    router.push(url);
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

  function handleSetCurrentPage(page: number) {
    setParams(filters ?? [], page);
  }

  return (
    <div className="min-h-[60vh] py-36 w-full flex flex-col items-center sm:flex-row sm:justify-around sm:items-start">
      <Filters
        filters={filters}
        search={search}
        setSearch={setSearch}
        removeFilter={removeFilter}
        addFilter={addFilter}
      />
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
          setCurrent={handleSetCurrentPage}
          products={products.length}
          productsPerPage={amountPerPage}
        />
      </div>
    </div>
  );
}
