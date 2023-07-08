import { categories } from "@/utils/categories"
import { Rule } from 'sanity';

const product = {
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields:[
        {
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (rule: Rule) => rule.required()
        },
        {
            name: 'url',
            title: 'URL Personalizada',
            type: 'slug',
            options:{source: 'name'},
            validation: (rule: Rule) => rule.required()
        },
        {
            name:'category',
            title: 'Categoría',
            type: 'string',
            options:{
                list: categories.map( c =>{
                    return { title: c[0].toUpperCase() + c.slice(1), value: c}
                })
            },
            validation: (rule: Rule) => rule.required()
        },
        {
            name: 'images',
            title: 'Imágenes',
            type: 'array',
            of: [{type:'image', options: {hotspot: true}}],
            validation: (rule: Rule) => rule.required()
        },
        {
            name: 'description',
            title: 'Descripción',
            type: 'array',
            of: [{type: 'block'}],
            validation: (rule: Rule) => rule.required()
        }
    ]
}

export default product