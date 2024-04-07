"use client";
import { navigation } from "@/constants/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsBagFill, BsChevronCompactDown } from "react-icons/bs";
import Cart from "./Cart";
import UseAnimations from "react-useanimations";
import menu2 from "react-useanimations/lib/menu2";
import { navItems } from "@/constants/NavItems";
import { Logo } from "@/assets/images";

interface IProps {
  color: "white" | "black";
}

export default function Nav({ color }: IProps) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <>
      <nav
        className={`z-20 bg-${color} w-full h-16 lg:h-[65px] fixed top-0 left-0 text-sm flex justify-center items-center`}
      >
        {/* Large */}
        <div
          className={`flex justify-between items-center w-[95%]  h-16 lg:h-[65px] border-b`}
        >
          <NavItemsLg />
          <NavItemsSm />
          <Link href={navigation.home}>
            <Image src={Logo} alt="NADD Logo" className={`w-[150px]`} />
          </Link>
          <div
            className={`flex flex-row justify-end items-center gap-10 flex-1`}
          >
            <MagnifyingGlassIcon
              className={`w-5 h-5 mr-3 fill-${
                color === "white" ? "black" : "white"
              }`}
            />
            <button
              onClick={() => setIsCartOpen(true)}
              className=" border-none bg-transparent p-0 m-0"
            >
              <BsBagFill
                className={`w-5 h-5 mr-3 lg:mr-0 self-end fill-white`}
              />
            </button>
          </div>
        </div>
      </nav>
      <Cart
        isOpen={isCartOpen}
        close={() => {
          setIsCartOpen(false);
        }}
      />
    </>
  );
}

const NavItemsLg = () => {
  return (
    <ul className={`navlg`}>
      {navItems.map((i) => {
        return (
          <li
            className={`nav-item  h-16 flex items-center ${
              i.categories ? `group` : ""
            }`}
          >
            <a href={i.href} className={` text-white uppercase font-semi-bold`}>
              {i.name}
            </a>
            {i.categories && (
              <div className={`navlg-categories`}>
                <ul className={`flex-row-center flex-wrap gap-5`}>
                  {i.categories.map((p) => (
                    <li className={`group/product navlg-categories-li`}>
                      <div className={`card-image`}>
                        <Image
                          src={p.image}
                          alt={`Imagén de ${p.name}`}
                          width={500}
                          height={500}
                          className={`group-hover/product:scale-110 navlg-categories-img`}
                        />
                      </div>
                      <Link
                        href={p.href}
                        className={`flex flex-1 absolute uppercase font-bold drop-shadow-md`}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const NavItemsSm = () => {
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState<boolean>(false);

  function itemClick(navItem: any) {
    if (navItem.categories) {
      setProductList(!productList);
    } else {
      setOpen(false);
      setProductList(false);
      document.getElementById("burgerMenu")?.click();
    }
  }

  return (
    <div className="flex min-[1220px]:hidden flex-1 justify-start items-center h-16">
      <UseAnimations
        id="burgerMenu"
        animation={menu2}
        size={35}
        strokeColor="#fff"
        speed={2}
        onClick={() => setOpen(!open)}
        className=" z-[55]"
      />
      <div
        className={`${
          open ? "visible" : "invisible"
        } w-full h-screen bg-black-hover z-50 fixed top-0 left-0 flex justify-start items-start`}
      >
        <div
          className={"navmd".concat(
            open
              ? " -translate-x-0 opacity-100"
              : " -translate-x-full opacity-0"
          )}
        >
          <ul className="flex flex-col text-center">
            {navItems.map((item, index) => {
              return (
                <li
                  onClick={() => itemClick(item)}
                  className={` ${
                    index === 0 || navItems[index - 1].categories
                      ? "border-t"
                      : index === navItems.length - 1
                      ? "border-y"
                      : ""
                  } ${
                    item.categories
                      ? "navmd-li-collapse".concat(
                          productList ? " max-h-[320px]" : " max-h-[50px]"
                        )
                      : "navmd-li"
                  }`}
                >
                  {!item.categories ? (
                    <Link href={item.href}>{item.name}</Link>
                  ) : (
                    <>
                      <span
                        onClick={() => setProductList(!productList)}
                        className={"navmd-li navmd-li-collapse-span"}
                      >
                        {item.name}
                        <BsChevronCompactDown
                          className={"h-5 w-5 absolute right-[15vw] lg:right-[60px] text-white transition-all duration-200 ".concat(
                            productList ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </span>
                      <ul className={"space-y-10 pb-10"} onClick={itemClick}>
                        {item.categories.map((p) => (
                          <li className="nav-item">
                            <Link
                              href={p.href}
                              className="capitalize opacity-95 font-regular"
                            >
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
