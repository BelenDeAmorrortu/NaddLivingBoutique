import { Rule } from 'sanity';

const category = {
    name: 'category',
    title: 'Categorías',
    type: 'document',
    fields:[
        {
            name: 'category',
            description: 'En singular, minúscula y con sus respectivas tíldes',
            title: 'Categoría',
            type: 'string',
            validation: (rule: Rule) => rule.required()
        },
    ]
}

export default category