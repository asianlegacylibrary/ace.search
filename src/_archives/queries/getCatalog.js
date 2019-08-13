import gql from "graphql-tag";

export default gql`
  query GetCatalog($id: String!) {
    catalog(_id: $id) {
      _id
      _source {
        ttltib
        ttltibbrf
        ttlskt
        ttleng
        colophon
      }
    }
  }
`;
