import { createClient, groq } from 'next-sanity'
import { Product } from '../types/Product'
import clientConfig from './config/client-config'

// interface Pagination {
//     page?: number;
//     size?: number;
// }

// interface GetProducts{
//     products: Product[],
//     total: number;
// }

export async function getProducts(filters: string[]): Promise<Product[]>{

    let queryString = ''

    if(filters.length > 0){
        filters.forEach( (f, index) =>{
            if(index === 0){
                queryString += ` && (category == '${f}'`
            }
            else{
                queryString += ` || category == '${f}'`
            }
        })
        queryString += `)`

    }

    const products =  await createClient(clientConfig).fetch(
        groq`*[_type == 'product' ${queryString}]{
            _id,
            name,
            category,
            "URL": URL.current,
            "images": images[].asset->url,
        }`
    )


    return products
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