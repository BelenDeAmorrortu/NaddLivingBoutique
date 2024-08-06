"use client";
import { getProducts } from "@/requests";
import { Product } from "@/types/Product";
import { Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { categories } from "@/constants/categories";
import { navigation } from "@/constants/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Card from "./Card";
import Image from "next/image";

interface IProps {
  visible: boolean;
  setSearchOpen: (arg: boolean) => void;
}

export default function Search({ visible, setSearchOpen }: IProps) {
  const [results, setResults] = useState<Product[]>([]);
  const [categoriesSearch, setCategoriesSearch] = useState<
    { name: string; url: string }[]
  >([]);
  const [form] = Form.useForm();
  const search = Form.useWatch("search", form);
  const inputRef = useRef<any>(null);

  const handleSearch = async () => {
    const searchProducts = await getProducts([], search, undefined);

    setResults(searchProducts);
  };

  const closeAndReset = () => {
    form.resetFields();
    setSearchOpen(false);
  };

  useEffect(() => {
    if (search) {
      handleSearch();

      setCategoriesSearch(
        categories
          .filter(
            (i) =>
              i.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) ||
              i.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((i) => {
            return {
              name: i,
              url: navigation.productos + "?filter=" + i,
            };
          })
      );
    }
  }, [search]);

  useEffect(() => {
    if (inputRef.current && visible) {
      inputRef.current.focus();
    }
  }, [visible]);

  return (
    <div
      className={`z-[29] w-full h-screen min-[640px]:h-fit flex-col items-center fixed top-14 left-0 lg:top-16 bg-black gap-5 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Form
        form={form}
        className="w-full h-14 md:h-16 flex-row-center px-10"
        initialValues={{ search: undefined }}
      >
        <button>
          <MagnifyingGlassIcon
            className={`w-5 h-5 md:w-6 md:h-6 fill-white-hover`}
          />
        </button>
        <Form.Item
          name="search"
          className="w-full h-fit flex flex-col "
          style={{ margin: 0 }}
        >
          <Input
            ref={inputRef}
            placeholder="Búsqueda..."
            size="large"
            className="search"
            onPressEnter={() =>
              (window.location.href =
                navigation.productos + "?search=" + search)
            }
          />
        </Form.Item>
        <button onClick={closeAndReset}>
          <IoClose size={25} className="fill-white" />
        </button>
      </Form>
      <div
        className={`${
          search
            ? "opacity-100 relative"
            : "opacity-0 -translate-y-[200%] absolute"
        } -z-10 w-full bg-black min-h-[50vh] grid grid-cols-4 gap-10 px-10 transition-opacity duration-300`}
      >
        <div className="order-2 col-span-4 min-[640px]:order-1 min-[640px]:col-span-2 min-[1080px]:col-span-1">
          <div className="border-b p-3 border-b-white-hover flex justify-between items-center">
            <h5 className="text-white-hover font-bold uppercase text-sm">
              Categorías
            </h5>
            {categoriesSearch.length > 0 && (
              <Link
                onClick={closeAndReset}
                href={
                  navigation.productos +
                  `?${categoriesSearch
                    .map((i) => "filter=" + i.name)
                    .join("&")}`
                }
                className="text-white text-sm"
              >
                Ver todo
              </Link>
            )}
          </div>
          <ul className="flex flex-col gap-5 my-5">
            {categoriesSearch.length > 0 ? (
              categoriesSearch?.map((i) => {
                return (
                  <li className="">
                    <Link
                      href={i.url}
                      className="text-white uppercase hover:text-white-hover"
                      onClick={closeAndReset}
                    >
                      {i.name}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="text-white-hover">Sin Resultados</li>
            )}
          </ul>
        </div>
        <div className="col-span-4 order-1 min-[640px]:order-2 min-[640px]:col-span-2 min-[1080px]:col-span-3">
          <div className=" p-3 border-b border-b-white-hover flex justify-between items-start">
            <h5 className="text-white-hover font-bold uppercase text-sm">
              {"Resultados" + ` (${results.length})`}
            </h5>
            {results.length > 0 && (
              <Link
                href={navigation.productos + "?search=" + search}
                className="text-white text-sm"
                onClick={closeAndReset}
              >
                Ver todo
              </Link>
            )}
          </div>
          <ul className="hidden min-[1080px]:grid min-[1080px]:grid-cols-3 my-5">
            {results.length > 0 ? (
              results.slice(0, 3).map((i) => {
                return (
                  <li onClick={closeAndReset}>
                    <Card {...i} color="white" />;
                  </li>
                );
              })
            ) : (
              <li className="text-white-hover">Sin Resultados</li>
            )}
          </ul>
          <ul className="flex flex-col min-[1080px]:hidden gap-3 py-3">
            {results.length > 0 ? (
              results.slice(0, 3).map((i) => {
                return (
                  <li>
                    <Link
                      href={navigation.productos + "/" + i.url}
                      className="flex flex-row-center w-full gap-3"
                      onClick={closeAndReset}
                    >
                      <div className="aspect-[3/2] w-24 h-auto relative rounded-sm">
                        <Image
                          src={i.images[0]}
                          placeholder={"blur"}
                          blurDataURL={i.lqip[0]}
                          alt="Imagen producto"
                          className=" object-cover absolute w-full h-full"
                          fill
                        />
                      </div>
                      <div className="h-fit w-full flex flex-col">
                        <h6 className="text-white uppercase m-0 p-0 text-xs">
                          {i.name}
                        </h6>
                        <h6 className="text-white-hover m-0 p-0 text-xs">
                          {i.category.join(" - ")}
                        </h6>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="text-white-hover">Sin Resultados</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
