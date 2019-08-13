import React from "react";
import { Query } from "react-apollo";
import query from "../queries/getCatalog";

export default ({ id }) => {
  console.log(id);
  return (
    <Query query={query} variables={{ id }}>
      {({ data, loading, error }) => {
        console.log(data, loading, error);
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error...</div>;
        }
        const { ttltib, colophon } = data.catalog._source;
        return (
          <React.Fragment>
            <div className="source-title">{ttltib}</div>
            <div className="source-colophon">{colophon}</div>
          </React.Fragment>
        );
      }}
    </Query>
  );
};
