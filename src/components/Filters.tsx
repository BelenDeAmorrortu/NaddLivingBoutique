"use client";
import { HiXMark } from "react-icons/hi2";
import useFetch from "@/hooks/useFetch";
import { getMetaobjects } from "@/requests";

interface Props {
  filters: string[] | undefined;
  search: string | undefined;
  setSearch: (arg: string | undefined) => void;
  removeFilter: (arg: string) => void;
  addFilter: (arg: string) => void;
}

export default function Filters({
  filters,
  search,
  setSearch,
  removeFilter,
  addFilter,
}: Props) {
  const { data: categoriesData } = useFetch(
    "categories",
    async () => await getMetaobjects("categoria")
  );

  return (
    <div className=" w-full space-y-2 sm:mt-10">
      <h4 className="subtitle-1 font-bold">Filtros</h4>
      <ul className="border-b border-grey py-3 flex flex-wrap w-full">
        {filters?.map((f, i) => (
          <li
            className="cursor-pointer py-1 px-2 bg-grey-hover max-w-min rounded-sm flex items-center capitalize mr-2 my-2"
            key={i}
          >
            {f}
            <HiXMark
              onClick={() => removeFilter(f)}
              className="w-4 h-4 ml-1 hover:stroke-red"
            />
          </li>
        ))}
      </ul>
      <h4 className="title-4">Categoría</h4>
      <ul className="border-b border-grey pb-3 w-full">
        {categoriesData?.map((f: ICategory, i: number) => (
          <li
            onClick={() => addFilter(f.nombre)}
            className=" text-black cursor-pointer capitalize hover:text-red w-fit"
            key={i}
          >
            {f.nombre}
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
              <HiXMark
                onClick={() => setSearch(undefined)}
                className="w-4 h-4 ml-1 hover:stroke-red"
              />
            </li>
          </ul>
        </>
      ) : null}
    </div>
  );
}
