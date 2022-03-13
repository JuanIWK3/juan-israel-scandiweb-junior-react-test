export const CATEGORY_QUERY = `
  {
    categories {
      name
      products {
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        brand
        id
      }
    }
  }
`;

export const productQuery = (productId: string) => {
  const PRODUCT_QUERY = `
    {
      product(id: "${productId}") {
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
        id
      }
    }
  `;

  return PRODUCT_QUERY;
};
