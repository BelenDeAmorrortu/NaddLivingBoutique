export const parseMetaobjects = (data: any) => {
  return data.metaobjects.edges.map((metaobject: any) => {
    const mappedFields = metaobject.node.fields.reduce(
      (acc: any, field: any) => {
        acc[field.key] =
          field.reference && field.reference.image?.url
            ? field.reference.image.url
            : field.value;
        return acc;
      },
      {}
    );

    return {
      id: metaobject.node.id,
      ...mappedFields,
    };
  });
};
