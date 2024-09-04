"use client";
import { navigation } from "@/constants/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { BsBagFill, BsChevronCompactDown } from "react-icons/bs";
import menu2 from "react-useanimations/lib/menu2";
import { navItems } from "@/constants/NavItems";
import { Logo } from "@/assets/images";
import { useCart } from "@/contexts/CartContext";
import CategoriesNav from "./CategoriesNav";
import Search from "./Search";
import AnimatedIcon from "./AnimatedIcon";

export default function Nav() {
  const [productCategoriesVisible, setProductCategoriesVisible] =
    useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const { setIsOpen, count } = useCart();

  useEffect(() => {
    if (isHovering && !searchOpen) {
      setProductCategoriesVisible(true);
    } else {
      const timeoutId = setTimeout(() => {
        if (!isHovering) {
          setProductCategoriesVisible(false);
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [isHovering]);

  return (
    <>
      <nav
        className={` z-30 bg-black w-full h-14 md:h-16 fixed top-0 left-0 text-sm flex justify-between px-[2.5%] items-center`}
      >
        <NavItemsLg setIsHovering={setIsHovering} />
        <NavItemsSm />
        <Link href={navigation.home}>
          <Image
            src={Logo}
            alt="NADD Logo"
            className={`w-[100px] md:w-[150px] h-auto`}
          />
        </Link>
        <div
          className={`flex flex-row justify-end items-center gap-6 md:gap-10 flex-1`}
        >
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <HiMagnifyingGlass className={`w-5 h-5 md:w-6 md:h-6 fill-white`} />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className=" border-none bg-transparent p-0 m-0 md:mr-3 lg:mr-0 flex-col-center relative"
            name="Carrito"
            aria-label="Carrito"
          >
            <BsBagFill
              className={`w-5 h-5 md:w-6 md:h-6 self-end fill-white`}
            />
            <span
              className={`absolute top-[3px] md:top-[7px] z-10 text-black text-[${
                String(count)?.length > 2 ? "8px" : "10px"
              }] md:text-${
                String(count)?.length > 2 ? "[5px]" : "xs"
              } font-bold`}
            >
              {count == 0 ? "" : count}
            </span>
          </button>
        </div>
      </nav>
      <div className="announcement-bar-2">
        <p className="text-white text-[10px] md:text-xs">
          3 y 6 Cuotas sin interes/ 35% OFF por transferencia
        </p>
      </div>
      <CategoriesNav
        visible={productCategoriesVisible}
        setIsHovering={setIsHovering}
      />
      <Search visible={searchOpen} setSearchOpen={setSearchOpen} />
    </>
  );
}

const NavItemsLg = ({
  setIsHovering,
}: {
  setIsHovering: (arg: boolean) => void;
}) => {
  return (
    <ul className={`navlg`}>
      {navItems.map((item, i) => {
        return (
          <li
            className={`nav-item flex items-center`}
            key={i}
            {...(item.name === "Productos"
              ? {
                  onMouseEnter: () => setIsHovering(true),
                  onMouseLeave: () => setIsHovering(false),
                }
              : {})}
          >
            <a
              href={item.href}
              className={` text-white uppercase font-semi-bold`}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const NavItemsSm = () => {
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listener to close the component when clicking outside of it
    const handleMouseDown = (e: any) => {
      console.log(e.target, open);
      if (
        !e.target.id.includes("menu2") &&
        !navRef?.current?.contains(e.target) &&
        open
      ) {
        setOpen(false);
        document.getElementById("burgerMenu")?.click();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

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
      <AnimatedIcon
        id="burgerMenu"
        animation={menu2}
        size={35}
        strokeColor="#fff"
        speed={2}
        onClick={() => setOpen(!open)}
        className="z-[55]"
      />
      <div
        className={`${
          open ? "visible" : "invisible"
        } w-full h-full bg-black-hover z-20 fixed top-0 left-0 flex justify-start items-start`}
      >
        <div
          className={"navmd".concat(
            open
              ? " -translate-x-0 opacity-100"
              : " -translate-x-full opacity-0"
          )}
          ref={navRef}
        >
          <ul className="flex flex-col text-center">
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
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
                          className={"h-5 w-5 absolute right-[15vw] md:right-[60px] text-white transition-all duration-200 ".concat(
                            productList ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </span>
                      <ul className={"space-y-10 pb-10"} onClick={itemClick}>
                        {item.categories.map((p, i) => (
                          <li className="nav-item" key={i}>
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
