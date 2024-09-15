"use client";
import { Card, Filters, Pagination } from "@/components";
import { useEffect, useState } from "react";
import { getProducts as getShopifyProducts } from "../../requests/index";
import { Product } from "../../types/Product";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { navigation } from "@/constants";
import { BiErrorCircle } from "react-icons/bi";
import { CascadeReveal } from "@/transitions";
import useFetch from "@/hooks/useFetch";
import CardSkeleton from "@/components/CardSkeleton";
import { CiCreditCard1 } from "react-icons/ci";
import { RiBankFill } from "react-icons/ri";
import { IoCashOutline } from "react-icons/io5";
import { TbSofaOff } from "react-icons/tb";

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
    <div className="min-h-[60vh] py-36 w-full flex flex-col items-center md:flex-row md:justify-between px-10 md:items-start">
      <div className="flex flex-col w-[85vw] sm:w-[70vw] mb-20 md:w-60 md:mb-0 md:sticky md:top-36">
        <Filters
          filters={filters}
          search={search}
          setSearch={setSearch}
          removeFilter={removeFilter}
          addFilter={addFilter}
        />
        <div className="flex flex-col gap-2 py-5">
          <div className="flex items-center">
            <CiCreditCard1 size={22} className="mr-2 mt-[2px] text-red" />
            <p className="text-xs min-[1040px]:text-sm">
              3 y 6 Cuotas sin interés
            </p>
          </div>
          <div className="flex items-center">
            <RiBankFill size={22} className="mr-2 mt-[2px] text-red" />
            <p className="text-xs min-[1040px]:text-sm">
              Transferencia 35% OFF
            </p>
          </div>
          <div className="flex items-center">
            <IoCashOutline size={22} className="mr-2 mt-[2px] text-red" />
            <p className="text-xs min-[1040px]:text-sm">Efectivo 35% OFF</p>
          </div>
        </div>
      </div>
      <div className="flex-col-center min-h-[60vh] min-w-[70vw]">
        {error ? (
          <p className="flex-row-center flex-1">
            <BiErrorCircle className="w-6 h-6 mr-7 text-red" /> Hubo un error
          </p>
        ) : products.length === 0 ? (
          <div className="flex-1 w-full flex-col-center opacity-50 gap-5">
            <TbSofaOff size={75} className="text-black" />
            <p className="text-lg text-center">No se encontraron resultados</p>
          </div>
        ) : (
          <div className="cards-container">
            {currentProducts.map((p, i) => (
              <CascadeReveal position={i / 2} key={i}>
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
