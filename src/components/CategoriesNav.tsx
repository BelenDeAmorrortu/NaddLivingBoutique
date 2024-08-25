"use client";
import { navItems } from "@/constants/NavItems";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  visible: boolean;
  setIsHovering: (arg: boolean) => void;
}

export default function CategoriesNav({ visible, setIsHovering }: IProps) {
  const productsNavItem = navItems?.find((i) => i.name === "Productos");

  return (
    <nav
      className={`navlg-categories ${
        visible
          ? "opacity-100 translate-y-[64px]"
          : "opacity-0 -translate-y-full"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ul className={`flex-row-center flex-wrap gap-5`}>
        {productsNavItem?.categories?.map((p, i) => (
          <li className={`group/product navlg-categories-li`} key={i}>
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
              onClick={() => setIsHovering(false)}
              className={`flex w-full h-full absolute uppercase font-bold drop-shadow-md flex-col-center`}
            >
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
