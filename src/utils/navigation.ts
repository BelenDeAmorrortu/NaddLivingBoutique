interface Props {
    home: string;
    productos: string;
    sillasYSillones: string;
    sofasyPuffs: string;
    mesas: string;
    fq: string;
    contacto: string;
}

export const navigation: Props = {
    home: '/',
    productos: '/productos',
    sillasYSillones: '/productos?filter=silla&filter=sillón',
    sofasyPuffs: '/productos?filter=sofá&filter=puff',
    mesas: '/productos?filter=mesa',
    fq: '/preguntas-frecuentes',
    contacto: '/contacto'

}