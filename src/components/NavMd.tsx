"use client";
import Image from "next/image";
import { Logo } from "../assets/images/index";
import UseAnimations from "react-useanimations";
import menu2 from "react-useanimations/lib/menu2";
import Link from "next/link";
import { Search } from ".";
import { useState } from "react";
import { navigation } from "@/utils/navigation";
import { BsChevronCompactDown } from "react-icons/bs";

export default function NavMd() {
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState<boolean>(false);

  function itemClick() {
    setOpen(false);
    setProductList(false);
    document.getElementById("burgerMenu")?.click();
  }

  return (
    <div className="flex flex-col lg:hidden w-full">
      <div className="flex flex-row justify-between items-center px-4 py-2 w-full">
        <Link href={navigation.home}>
          <Image src={Logo} alt="NADD Logo" className="w-28" />
        </Link>
        <div className="flex space-x-3">
          <Search />
          <UseAnimations
            id="burgerMenu"
            animation={menu2}
            size={35}
            strokeColor="#fff"
            speed={2}
            onClick={() => setOpen(!open)}
            className="mr-2"
          />
        </div>
      </div>

      <div
        className={"bg-black w-screen h-screen flex flex-col justify-start items-center py-16 space-y-10 absolute top-12 transition-all duration-700 ".concat(
          open ? " translate-x-0 opacity-100" : " translate-x-full opacity-0"
        )}
      >
        <ul className="flex flex-col text-center">
          <li
            onClick={itemClick}
            className="title-3 text-white border-t-2 border-grey-hover py-2 w-[80vw] md:w-[50vw] hover:text-white-hover cursor-pointer"
          >
            <Link href={navigation.home}>Home</Link>
          </li>
          <li
            className={" w-[80vw] md:w-[50vw] space-y-10 overflow-hidden transition-all duration-[0.3s] ease-linear ".concat(
              productList ? " max-h-[320px]" : " max-h-[40px]"
            )}
          >
            <span
              onClick={() => setProductList(!productList)}
              className={"flex-row-center title-3 text-white border-y-2 border-grey-hover text-center block py-2 hover:text-white-hover cursor-pointer".concat(
                !productList ? " border-b-0" : ""
              )}
            >
              Productos
              <BsChevronCompactDown
                className={"h-5 w-5 absolute right-[15vw] text-white transition-all duration-700 ".concat(
                  productList ? "rotate-180" : "rotate-0"
                )}
              />
            </span>
            <ul className={"space-y-10 pb-10"} onClick={itemClick}>
              <li className="nav-item">
                <Link href={navigation.productos}>Ver Todo</Link>
              </li>
              <li className="nav-item">
                <Link href={navigation.sillasYSillones}>Sillas y Sillones</Link>
              </li>
              <li className="nav-item">
                <Link href={navigation.sofasyPuffs}>Sofás y Puffs</Link>
              </li>
              <li className="nav-item">
                <Link href={navigation.mesas}>Mesas</Link>
              </li>
            </ul>
          </li>
          <li
            onClick={itemClick}
            className="title-3 text-white border-y-2 border-grey-hover py-2 w-[80vw] md:w-[50vw] hover:text-white-hover cursor-pointer"
          >
            <Link href={navigation.contacto}>Contacto</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
