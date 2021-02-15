import gql from 'graphql-tag';

const query = gql`
  query menu($brand: brand!, $product: product!, $region: region!) {
    menu(brand: $brand, product: $product, region: $region) {
      header
      footer
    }
  }
`;

export default query;
