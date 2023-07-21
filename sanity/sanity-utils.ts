import { createClient, groq } from 'next-sanity'
import { Product } from '../types/Product'
import clientConfig from './config/client-config'
import imageUrlBuilder from '@sanity/image-url'
import { removeAccents } from '@/utils/removeAccents'
import { Faq } from '../types/Faq'

export const client = createClient(clientConfig)
const builder = imageUrlBuilder(client)

export function sanityImage(url: string){
    return builder.image(url)
}

export async function getProducts(filters: string[] | undefined, search: string | undefined): Promise<Product[]>{

    const filterString = filters && filters?.length > 0 ? `&& category->category in [${filters.map(category => `"${category}"`).join(',')}]` : '' 


    const products = await client.fetch(
        groq`*[_type == 'product' ${filterString}]{
            _id,
            name,
            "category": category->category,
            "url": url.current,
            "images": images[].asset->url,
            "lqip": images[].asset->metadata.lqip,                
        }`
    )
    
    if(search && search.trim() !== ''){
   
        const matches: Product[] = []
        const inputLength = search.length

        products.forEach( (p: Product) =>{
            let count = 0
            let inputI= 0
            let equalCount = 0

            const stringProducto = removeAccents(`${p.category} ${p.name}`)
            let arrayProducto = stringProducto.split('')
            let input = search = removeAccents(search ?? '')


            for(let i = 0; i < arrayProducto.length ; i++){

                let l = arrayProducto[i]
                let lInput = input[inputI]

                if(inputI === inputLength || (stringProducto.length - 1 === i)){
                    if((((count - equalCount) / inputLength) * 100) >= 60){
                        matches.push(p)
                    }
                    return
                }

                else if(l === lInput){
                    if(inputI === count){
                        count += 1
                        inputI += 1
                    }
                    else {
                        inputI += 1
                        count = inputI
                        if(inputI - count === 2) equalCount += 2
                        else equalCount += 1
                    }
                }
                else if( l !== lInput && inputI > 0 && (inputI === count || (inputI - count) === 2) || (inputI - count) === 1){
                    inputI += 1
                }
                else if( l !== lInput && inputI > count){
                    count = 0
                    inputI = 0
                    equalCount = 0
                }
            }
        })

        return matches
    }
    else {
        return products
    }
}

export async function getProduct(slug: string): Promise<Product>{
    
    return client.fetch(
        groq`*[_type == 'product' && url.current == $slug][0]{
            name,
            "category": category->category,
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
                "category": category->category,
                "url": url.current,
                "images": images[].asset->url,
                "lqip": images[].asset->metadata.lqip,                
            }
        }.spotlight`,
    )
}

export async function getCategories(): Promise<string[]>{
    
    const categories =  await client.fetch(
        groq`*[_type == 'category']{
            category               
        }`
    )

    return categories.map((c: {category: string}) => c.category)
}

export async function getFaq(): Promise<Faq[]>{
    
    return await client.fetch(
        groq`*[_type == 'faq']{
            _id,
            question,
            answer               
        }`
    )

}