import { PortableTextBlock } from 'sanity';

export type Product = {
    _id: string;
    name: string;
    category: string;
    url: string;
    lqip: string[];
    images: string[];
    description: PortableTextBlock[];
}