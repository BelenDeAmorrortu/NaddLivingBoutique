import { Almohadones2, Sillon, Sofas, Todo } from "@/assets/images";

export const navigation: Record<string, string> = {
  home: "/",
  productos: "/productos",
  sillasYSillones: "/productos?filter=silla&filter=sillón",
  sofasyPuffs: "/productos?filter=sofá&filter=puff",
  almohadones: "/productos?filter=almohadón",
  faq: "/preguntas-frecuentes",
  contacto: "/#contacto",
  telas: "/telas",
};

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

export const placeholderBlurParams =
  "&width=100&quality=10&format=webp&blur=100";

export const placeholderImage =
  "data:image/webp;base64,UklGRkwCAABXRUJQVlA4WAoAAAAwAAAAgwAAYwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIEAAAAAEHUKmICAAo0v//EdH/VBRWUDggRgAAAHAGAJ0BKoQAZAA/EYjAWiwpJqQgiAGAIglpbuF0kABPbYi8QVHPbEXiCo57Yi8QVHPbEXiCo57Yi8QCAAD+/olkAAAAAAA=";
