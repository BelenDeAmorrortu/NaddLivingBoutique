import { StructureBuilder } from "sanity/desk"
export const deskStructure = (S: StructureBuilder) =>{
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
                .filter(listItem => !(listItem.getId() === 'sections' ))
        ])
}