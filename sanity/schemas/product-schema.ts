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
            type: 'reference',
            to: [{ type: 'category' }],
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