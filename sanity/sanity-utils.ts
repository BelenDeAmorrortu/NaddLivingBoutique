import { createClient, groq } from 'next-sanity'
import { Product } from '../types/Product'
import clientConfig from './config/client-config'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient(clientConfig)
const builder = imageUrlBuilder(client)

export function sanityImage(url: string){
    return builder.image(url)
}

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

    return await client.fetch(
        groq`*[_type == 'product' ${queryString}]{
            _id,
            name,
            category,
            "url": url.current,
            "images": images[].asset->url,
            "lqip": images[].asset->metadata.lqip,                
        }`
    )
}

export async function getProduct(slug: string): Promise<Product>{
    
    return client.fetch(
        groq`*[_type == 'product' && url.current == $slug][0]{
            name,
            category,
            "images": images[].asset->url,
            "lqip": images[].asset->metadata.lqip,                
            description
        }`,
        { slug }

    )
}

export async function getSpotlight(): Promise<Product[]>{
    
    return await client.fetch(
        groq`*[_type == 'sections'][0]{
            spotlight[]->{
                _id,
                name,
                category,
                "url": url.current,
                "images": images[].asset->url,
                "lqip": images[].asset->metadata.lqip,                
            }
        }.spotlight`,
    )
}