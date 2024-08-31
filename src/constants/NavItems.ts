import { Almohadones2, Sillon, Sofas, Todo } from "@/assets/images";
import { navigation } from "@/constants/navigation";

export const navItems = [
  {
    name: `Home`,
    href: navigation.home,
  },
  {
    name: `Productos`,
    href: navigation.productos,
    categories: [
      {
        name: `Sillas y Sillones`,
        href: navigation.sillasYSillones,
        image: Sillon,
      },
      {
        name: `Sofás y Puffs`,
        href: navigation.sofasyPuffs,
        image: Sofas,
      },
      {
        name: `Almohadones`,
        href: navigation.almohadones,
        image: Almohadones2,
      },
      {
        name: `Ver todo`,
        href: navigation.productos,
        image: Todo,
      },
    ],
  },
  {
    name: "Telas",
    href: navigation.telas,
  },
  {
    name: "Contacto",
    href: navigation.contacto,
  },
];
