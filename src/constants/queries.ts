export const queries = {
  products: `query Products($filter: String){
        products(first: 250, query: $filter){
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
                  },
              edges{
                node{
                  id,
                  title,
                  productType,
                  tags,
                  handle,
                  descriptionHtml,
                  variants(first: 12){
                    nodes {
                      title,
                      price{
                        amount
                      },
                      id
                    }
                  },
                  images(first: 2){
                    edges{
                      node{
                        altText,
                        url
                      }
                    }
                  }
                }
              }
        }
      }`,
  product: `query SingleProduct($handle: String!){
        productByHandle(handle: $handle){
            id,
            title,
            productType,
            tags,
            handle,
            descriptionHtml,
            variants(first: 12){
              nodes {
                title,
                price{
                  amount
                },
                id
              }
            }
            images(first: 100){
                edges{
                node{
                    altText,
                    url
                }
                }
            }
        }
      }`,
  spotlight: `query ProductsByCollectionName($collection: String!) {
        collectionByHandle(handle: $collection) {
          products(first: 6) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
              cursor
              node {
                id
                title
                productType
                tags
                handle
                variants(first: 12){
                  nodes {
                    title,
                    price{
                      amount
                    },
                    id
                  }
                }
                images(first: 2) {
                  edges {
                    node {
                      altText
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }`,
  metaobjects: `query Metaobjects($type: String!){
        metaobjects(first:250, type: $type){
          edges {
            node {
              id
            }
          }
        }
      }`,
  metaobject: `query Metaobject($id: ID!){
        metaobject(id:$id) {
                id
                fields{
                  key
                  value
                }
                type
              }
          }`,
};
