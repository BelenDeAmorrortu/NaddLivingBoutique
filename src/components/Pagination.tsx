import {
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/outline";
import { SetStateAction, useEffect } from "react";

type Props = {
  products: number;
  productsPerPage: number;
  current: number;
  setCurrent: (arg: number) => void;
};

export default function Pagination({
  products,
  productsPerPage,
  current,
  setCurrent,
}: Props) {
  const pages = [];
  const numOfPages = Math.ceil(products / productsPerPage);

  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex space-x-5">
      <ArrowSmallLeftIcon
        onClick={() => setCurrent((cur: number) => (cur !== 1 ? cur - 1 : cur))}
        className="stroke-black hover:stroke-black-hover w-5 h-5"
      />
      {pages.map((p) => (
        <button
          onClick={() => setCurrent(p)}
          className={
            "bg-transparent border-none font-semi-bold hover:font-bold" +
            (current === p ? " text-red" : " text-black")
          }
        >
          {p}
        </button>
      ))}
      <ArrowSmallRightIcon
        onClick={() =>
          setCurrent((cur: number) => (cur !== pages.length ? cur + 1 : cur))
        }
        className="stroke-black hover:stroke-black-hover w-5 h-5"
      />
    </div>
  );
}
