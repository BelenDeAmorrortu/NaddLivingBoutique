import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";

type Props = {
  products: number;
  productsPerPage: number;
  current: number;
  setCurrent: (arg: number) => void;
  visible: boolean;
};

export default function Pagination({
  products,
  productsPerPage,
  current,
  setCurrent,
  visible,
}: Props) {
  const pages = [];
  const numOfPages = Math.ceil(products / productsPerPage);

  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  return (
    <div
      className={"flex-row-center space-x-4 ".concat(
        visible ? "visible" : "invisible"
      )}
    >
      <HiArrowSmallLeft
        onClick={() => setCurrent(current !== 1 ? current - 1 : current)}
        className="stroke-black hover:stroke-black-hover w-5 h-5 cursor-pointer"
      />
      {pages.map((p, index) => (
        <button
          key={index}
          onClick={() => setCurrent(p)}
          className={
            "bg-transparent border-none font-semi-bold hover:font-bold" +
            (current === p ? " text-red" : " text-black")
          }
        >
          {p}
        </button>
      ))}
      <HiArrowSmallRight
        onClick={() =>
          setCurrent(current !== pages.length ? current + 1 : current)
        }
        className="stroke-black hover:stroke-black-hover w-5 h-5 cursor-pointer"
      />
    </div>
  );
}
