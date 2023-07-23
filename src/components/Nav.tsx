import NavLg from "./NavLg";
import NavMd from "./NavMd";

export default function Nav() {
  return (
    <nav className="z-20 bg-black w-full h-16 lg:h-fit fixed top-0 left-0 flex-col-center text-sm">
      <NavLg />
      <NavMd />
    </nav>
  );
}
