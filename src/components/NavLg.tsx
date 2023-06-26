import Image from "next/image";
import { Logo } from "../assets/images/index";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Search } from "../components";

export default function NavLg() {
  return (
    <div className="hidden lg:flex-row-center w-screen">
      <Search />

      <ul className="text-center w-fit flex-row-center space-x-24 h-20">
        <li className="nav-item group h-20 flex items-center">
          <Link href="/productos">Productos</Link>
          <ul className="hidden group-hover:flex-row-center hover:flex-row-center -translate-y-full group-hover:translate-y-[85px] hover:translate-y- flex-row-center absolute left-0 text-center w-full py-8 space-x-24 border-t-2 border-grey-hover bg-black">
            <li className="nav-item">
              <Link href="/productos">Ver Todo</Link>
            </li>
            <li className="nav-item">
              <Link href="/productos?filter=silla&filter=sillón">
                Sillas y Sillones
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/productos?filter=sofá&filter=puff">
                Sofás y Puffs
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/productos?filter=mesa">Mesas</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/">
            <Image src={Logo} alt="NADD Logo" className="w-44" />
          </Link>
        </li>
        <li className="nav-item h-20 flex items-center">
          <Link href="/contacto">Contacto</Link>
        </li>
      </ul>
      <Link className="absolute right-8" href="/">
        <HomeIcon className="w-5 h-5 mr-3 lg:mr-0 fill-white self-end" />
      </Link>
    </div>
  );
}
