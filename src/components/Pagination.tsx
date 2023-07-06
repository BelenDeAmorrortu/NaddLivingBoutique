import {
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/outline";

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
      <ArrowSmallLeftIcon
        onClick={() => setCurrent(current !== 1 ? current - 1 : current)}
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
          setCurrent(current !== pages.length ? current + 1 : current)
        }
        className="stroke-black hover:stroke-black-hover w-5 h-5"
      />
    </div>
  );
}
// import { navigation } from "@/utils/navigation";
// import {
//   ArrowSmallRightIcon,
//   ArrowSmallLeftIcon,
// } from "@heroicons/react/24/outline";
// import { RouteHandlerManager } from "next/dist/server/future/route-handler-managers/route-handler-manager";
// import { useRouter, useSearchParams } from "next/navigation";

// type Props = {
//   products: number;
//   productsPerPage: number;
//   handleChange: (button: string, value: number) => void;
// };
//
// export default function Pagination({
//   products,
//   productsPerPage,
//   handleChange,
// }: Props) {
//   const params = useSearchParams();
//   const router = useRouter();
//   const pages = [];
//   const numOfPages = Math.ceil(products / productsPerPage);
//   const current = !params.getAll("page").length
//     ? 1
//     : Number(params.getAll("page")[0]);

//   for (let i = 1; i <= numOfPages; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex space-x-5">
//       <ArrowSmallLeftIcon
//         onClick={() => {
//           if (current !== 1) handleChange("pagination", current - 1);
//         }}
//         className="stroke-black hover:stroke-black-hover w-5 h-5"
//       />
//       {pages.map((p) => (
//         <button
//           onClick={() => handleChange("pagination", p)}
//           className={
//             "bg-transparent border-none font-semi-bold hover:font-bold" +
//             (current === p ? " text-red" : " text-black")
//           }
//         >
//           {p}
//         </button>
//       ))}
//       <ArrowSmallRightIcon
//         onClick={() => {
//           if (current !== pages.length) handleChange("pagination", current + 1);
//         }}
//         className="stroke-black hover:stroke-black-hover w-5 h-5"
//       />
//     </div>
//   );
// }
