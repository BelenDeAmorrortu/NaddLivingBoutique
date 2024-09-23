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
  metaobjects: `query Metaobjects($type: String!) {
  metaobjects(first: 250, type: $type) {
    edges {
      node {
        id
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
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
  createCart: `mutation Cart($products: [CartLineInput!], $attributes: [AttributeInput!]){
           cartCreate(input: {
            lines: $products, attributes: $attributes}){
            cart {
              id
              checkoutUrl
            }
  }
}`,
  getCart: `query Cart($id: ID!){
    cart(id: $id) {
      id,
      checkoutUrl,
      totalQuantity,
      lines(first: 20){
        edges{
          node{
            id,
            quantity,
            merchandise {
              ... on ProductVariant {
                id, 
                title, 
                price{
                  amount
                }
                product{
                  id,
                  handle,
                  title,
                  featuredImage{
                    url
                  }
                }
              }
            }
          }
        }
      },
      attributes {
        key,
        value
      },
      cost {
        totalAmount {
          amount,
          currencyCode
        }
      }
    }
  }`,
  addCart: `mutation cartLinesAdd($id: ID!, $products: [CartLineInput!]!) {
  cartLinesAdd(cartId: $id, lines: $products) {
    cart {
      id,
      totalQuantity,
      checkoutUrl,
      lines(first: 20){
        edges{
          node{
            id,
            quantity,
            merchandise {
              ... on ProductVariant {
                id, 
                title, 
                price{
                  amount
                }
                product{
                  id,
                  handle,
                  title,
                  featuredImage{
                    url
                  }
                }
              }
            }
          }
        }
      },
      attributes {
        key,
        value
      },
      cost {
        totalAmount {
          amount,
          currencyCode
        }
      }
    }
  }
}`,
  updateCart: `mutation cartLinesUpdate($id: ID!, $products: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $id, lines: $products) {
    cart {
      id,
      checkoutUrl,
      totalQuantity,
      lines(first: 20){
        edges{
          node{
            id,
            quantity,
            merchandise {
              ... on ProductVariant {
                id,
                title, 
                price{
                  amount
                }
                product{
                  id,
                  handle,
                  title,
                  featuredImage{
                    url
                  }
                }              
              }
            }
          }
        }
      },
      attributes {
        key,
        value
      },
      cost {
        totalAmount {
          amount,
          currencyCode
        }
      }
    }
  }
}`,
  removeCart: `mutation cartLinesRemove($id: ID!, $productIds: [ID!]!) {
  cartLinesRemove(cartId: $id, lineIds: $productIds) {
    cart {
      id,
      checkoutUrl,
      totalQuantity,
      lines(first: 20){
        edges{
          node{
            id,
            quantity,
            merchandise {
              ... on ProductVariant {
                id, 
                title, 
                price{
                  amount
                }
                product{
                  id,
                  handle,
                  title,
                  featuredImage{
                    url
                  }
                }
              }
            }
          }
        }
      },
      attributes {
        key,
        value
      },
      cost {
        totalAmount {
          amount,
          currencyCode
        }
      }
    }
  }
}`,
  updateCartAttributes: `mutation cartAttributesUpdate($attributes: [AttributeInput!]!, $id: ID!) {
  cartAttributesUpdate(attributes: $attributes, cartId: $id) {
    cart {
      id
    }
  }
}`,
};
