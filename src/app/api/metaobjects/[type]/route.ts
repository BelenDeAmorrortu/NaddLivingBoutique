import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const { type } = params;

  try {
    const { data } = await storefront(queries.metaobjects, { type });

    const metaobjectsValues = data.metaobjects.edges.map((metaobject: any) => {
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

    return NextResponse.json(metaobjectsValues);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metaobjects" },
      { status: 500 }
    );
  }
}
