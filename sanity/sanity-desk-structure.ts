import { StructureBuilder } from "sanity/desk"
export const deskStructure = (S: StructureBuilder) =>{
    return S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Destacados")
                .id("sections")
                .child(
                    S.document()
                        .title("Destacados")
                        .schemaType("sections")
                        .documentId("sections")
                ),
            ...S.documentTypeListItems()
                .filter(listItem => !(listItem.getId() === 'sections'))
        ])
}