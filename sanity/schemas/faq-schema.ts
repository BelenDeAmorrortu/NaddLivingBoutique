import { Rule } from 'sanity';

const faq = {
    name: 'faq',
    title: 'Preguntas Frecuentes',
    type: 'document',
    fields:[
        {
            name: 'question',
            title: 'Pregunta',
            type: 'string',
            validation: (rule: Rule) => rule.required()
        },
        {
            name: 'answer',
            title: 'Respuesta',
            type: 'array',
            of: [{type: 'block'}],
            validation: (rule: Rule) => rule.required()
        },
    ]
}

export default faq