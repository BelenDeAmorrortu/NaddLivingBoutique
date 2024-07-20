"use client";
import { Card, Filters, Pagination } from "@/components";
import { useEffect, useState } from "react";
import { getProducts as getShopifyProducts } from "../../requests/index";
import { Product } from "../../types/Product";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { navigation } from "@/constants/navigation";
import { FiInfo } from "react-icons/fi";
import { BiErrorCircle } from "react-icons/bi";
import { CascadeReveal } from "@/transitions";
import useFetch from "@/hooks/useFetch";
import CardSkeleton from "@/components/CardSkeleton";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();

  // Products and filtration
  const [products, setProducts] = useState<Product[]>(Array(12).fill(""));
  const [filters, setFilters] = useState<string[]>();
  const [search, setSearch] = useState<string | undefined>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [amountPerPage, setAmountPerPage] = useState(12);
  const indexOfLastOfPage = currentPage * amountPerPage;
  const indexOfFirstOfPage = indexOfLastOfPage - amountPerPage;
  const currentProducts = products.slice(indexOfFirstOfPage, indexOfLastOfPage);

  const {
    error,
    data: productData,
    refetch,
    isLoading,
  } = useFetch(
    "products",
    async () =>
      await getShopifyProducts(filters ? filters : [], search, undefined)
  );

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
    <div className="min-h-[60vh] py-36 w-full flex flex-col items-center sm:flex-row sm:justify-between px-10 sm:items-start">
      <div className="flex flex-col w-[85vw] mb-20 sm:w-48 md:w-60 min-[640px]:mb-0 min-[640px]:sticky min-[640px]:top-36">
        <Filters
          filters={filters}
          search={search}
          setSearch={setSearch}
          removeFilter={removeFilter}
          addFilter={addFilter}
        />
        <h4 className="hidden min-[640px]:block w-full font-semi-bold text-black text-sm md:text-lg my-10 uppercase">
          Colores, texturas, modelos{" "}
          <span className="font-bold  text-red">
            <span className="text-xl md:text-3xl">100% </span>
            <span className="leading-7 md:leading-10">personalizados</span>
          </span>
        </h4>
        {/* <Image
          src={Outline}
          alt="Ilustración de un sofá"
          className="w-full h-auto my-10"
        /> */}
      </div>
      <div className="flex-col-center min-h-[60vh] min-w-[70vw]">
        {error ? (
          <p className="flex-row-center flex-1">
            <BiErrorCircle className="w-6 h-6 mr-7 text-red" /> Hubo un error
          </p>
        ) : products.length === 0 ? (
          <p className="flex-row-center flex-1">
            <FiInfo className="w-6 h-6 mr-7" /> No se encontraron resultados
          </p>
        ) : (
          <div className="cards-container">
            {currentProducts.map((p, i) => (
              <CascadeReveal key={i}>
                {isLoading !== false ? <CardSkeleton /> : <Card {...p} />}
              </CascadeReveal>
            ))}
          </div>
        )}
        <Pagination
          visible={!(isLoading || products.length === 0)}
          current={currentPage}
          setCurrent={handleSetCurrentPage}
          products={products.length}
          productsPerPage={amountPerPage}
        />
      </div>
    </div>
  );
}
