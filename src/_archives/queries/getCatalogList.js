import gql from "graphql-tag";
export default gql`
  query GetCatalogList {
    catalogs {
      total
      hits {
        _id
      }
    }
  }
`;
