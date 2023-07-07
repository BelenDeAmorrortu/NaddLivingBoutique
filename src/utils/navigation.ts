interface Props {
    home: string;
    productos: string;
    sillasYSillones: string;
    sofasyPuffs: string;
    mesas: string;
    faq: string;
    contacto: string;
}

export const navigation: Props = {
    home: '/',
    productos: '/productos',
    sillasYSillones: '/productos?filter=silla&filter=sillón',
    sofasyPuffs: '/productos?filter=sofá&filter=puff',
    mesas: '/productos?filter=mesa',
    faq: '/preguntas-frecuentes',
    contacto: '/#contacto'

}