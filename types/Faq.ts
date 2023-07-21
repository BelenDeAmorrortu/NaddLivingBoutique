import { PortableTextBlock } from 'sanity';

export type Faq = {
    _id: string;
    question: string;
    answer: PortableTextBlock[];
}