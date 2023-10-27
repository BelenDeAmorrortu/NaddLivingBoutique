import { Rule } from "sanity";

const category = {
  name: "category",
  title: "Categorías",
  type: "document",
  fields: [
    {
      name: "category",
      description: "En singular, minúscula y con sus respectivas tíldes",
      title: "Categoría",
      type: "string",
      validation: (Rule: Rule) => {
        return Rule.required()
          .lowercase()
          .error("El título debe ser en minúsculas");
      },
    },
  ],
};

export default category;
