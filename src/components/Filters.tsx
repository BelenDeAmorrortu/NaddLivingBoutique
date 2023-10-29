"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getCategories } from "../sanity/requests/sanity-requests";

const queryClient = new QueryClient();

export default function Filters(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Content {...props} />
    </QueryClientProvider>
  );
}

interface Props {
  filters: string[] | undefined;
  search: string | undefined;
  setSearch: (arg: string | undefined) => void;
  removeFilter: (arg: string) => void;
  addFilter: (arg: string) => void;
}

export function Content({
  filters,
  search,
  setSearch,
  removeFilter,
  addFilter,
}: Props) {
  const { data: categoriesData } = useQuery({
    queryFn: () => getCategories(),
    placeholderData: [],
  });

  return (
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
        {categoriesData?.map((f) => (
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
  );
}
