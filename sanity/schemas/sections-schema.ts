const sections = {

    name: 'sections',
    title: 'Destacados',
    type: 'document',
    fields:[
        {
            name: 'spotlight',
            title: 'Productos Destacados',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'product'}]
                }
            ],
            validation: Rule => Rule.length(6).required().unique()
        }
    ]

}

export default sections