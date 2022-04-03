import {
  ApolloClient,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000',
});

export const CATEGORY_QUERY = gql`
  query Query {
    categories {
      name
    }
  }
`;

export const ALL_ITEMS_QUERY = gql`
  query Query {
    categories {
      name
      products {
        id
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
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ProductQuery($productId: String!) {
    product(id: $productId) {
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
    }
  }
`;

export const CURRENCY_QUERY = gql`
  query Query {
    currencies {
      label
      symbol
    }
  }
`;
