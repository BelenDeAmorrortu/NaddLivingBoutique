interface Props {
    home: string;
    productos: string;
    sillasYSillones: string;
    sofasyPuffs: string;
    mesasYMuebles: string;
    faq: string;
    contacto: string;
}

export const navigation: Props = {
    home: '/',
    productos: '/productos',
    sillasYSillones: '/productos?filter=silla&filter=sillón',
    sofasyPuffs: '/productos?filter=sofá&filter=puff',
    mesasYMuebles: '/productos?filter=mesa&filter=mueble',
    faq: '/preguntas-frecuentes',
    contacto: '/#contacto'

}