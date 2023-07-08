import { PortableTextBlock } from 'sanity';

export type Product = {
    _id: string;
    name: string;
    category: string;
    url: string;
    images: string[];
    description: PortableTextBlock[];
}