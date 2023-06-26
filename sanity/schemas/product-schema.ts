const product = {
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields:[
        {
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: rule => rule.required()
        },
        {
            name: 'URL',
            title: 'URL Personalizada',
            type: 'slug',
            options:{source: 'name'},
            validation: rule => rule.required()
        },
        {
            name:'category',
            title: 'Categoría',
            type: 'string',
            options:{
                list:[
                    { title: 'Sofá', value: 'sofá'},
                    { title: 'Puff', value: 'puff'},
                    { title: 'Silla', value: 'silla'},
                    { title: 'Sillón', value: 'sillón'},
                    { title: 'Mesa', value: 'mesa'},
                ]
            },
            validation: rule => rule.required()
        },
        {
            name: 'images',
            title: 'Imágenes',
            type: 'array',
            of: [{type:'image', options: {hotspot: true}}],
            validation: rule => rule.required()
        },
        {
            name: 'description',
            title: 'Descripción',
            type: 'array',
            of: [{type: 'block'}],
            validation: rule => rule.required()
        }
    ]
}

export default product