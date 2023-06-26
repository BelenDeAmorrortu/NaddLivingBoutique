
export const deskStructure = (S, context) =>{
    return S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Personalizar Secciones")
                .id("sections")
                .child(
                    S.document()
                        .title("Personalizar Secciones")
                        .schemaType("sections")
                        .documentId("sections")
                ),
            S.divider(),
            ...S.documentTypeListItems()
                .filter(listItem => !['sections'].includes(listItem.getId()))
        ])
}