interface Props {
  home: string;
  productos: string;
  sillasYSillones: string;
  sofasyPuffs: string;
  almohadones: string;
  faq: string;
  contacto: string;
  telas: string;
}

export const navigation: Props = {
  home: "/",
  productos: "/productos",
  sillasYSillones: "/productos?filter=silla&filter=sillón",
  sofasyPuffs: "/productos?filter=sofá&filter=puff",
  almohadones: "/productos?filter=almohadón",
  faq: "/preguntas-frecuentes",
  contacto: "/#contacto",
  telas: "/telas",
};
