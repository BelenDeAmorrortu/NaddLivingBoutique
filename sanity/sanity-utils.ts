import { createClient, groq } from 'next-sanity'
import { Product } from '../types/Product'
import clientConfig from './config/client-config'

export async function getProducts(): Promise<Product[]>{

    return createClient(clientConfig).fetch(
        groq`*[_type == 'product']{
            _id,
            name,
            category,
            "URL": URL.current,
            "images": images[].asset->url,
        }`
    )
}

export async function getProduct(slug: string): Promise<Product>{
    
    return createClient(clientConfig).fetch(
        groq`*[_type == 'product' && URL.current == $slug][0]{
            name,
            category,
            "images": images[].asset->url,
            description
        }`,
        { slug }
    )
}

export async function getSpotlight(): Promise<Product[]>{
    
    return createClient(clientConfig).fetch(
        groq`*[_type == 'sections'][0]{
            spotlight[]->{
                _id,
                name,
                category,
                "URL": URL.current,
                "images": images[].asset->url,                
            }
        }.spotlight`,
    )
}

// export async function getSofas(): Promise<Product[]>{
    
//     return createClient(clientConfig).fetch(
//         groq`*[_type == 'product' && (category == 'sofá' || category == 'puff')]{
//             _id,
//             name,
//             category,
//             "URL": URL.current,
//             "images": images[].asset->url,
//         }`
//     )
// }

// export async function getChairs(): Promise<Product[]>{
    
//     return createClient(clientConfig).fetch(
//         groq`*[_type == 'product' && (category == 'silla' || category == 'sillón')]{
//             _id,
//             name,
//             category,
//             "URL": URL.current,
//             "images": images[].asset->url,
//         }`
//     )
// }

// export async function getTables(): Promise<Product[]>{
    
//     return createClient(clientConfig).fetch(
//         groq`*[_type == 'product' && category == 'mesa']{
//             _id,
//             name,
//             category,
//             "URL": URL.current,
//             "images": images[].asset->url,
//         }`
//     )
// }