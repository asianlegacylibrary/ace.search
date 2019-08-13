import React from "react";
import { Query } from "react-apollo";
import query from "../queries/getCatalogList";

export default () => {
  return (
    <Query query={query}>
      {({ data: { catalogs, cursor }, loading, error, fetchMore }) => {
        console.log(catalogs, cursor, loading, error);
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error...</div>;
        }
        const catalogListing = catalogs.hits.map(c => c._id);
        return (
          <React.Fragment>
            <div className="hits-count">
              {`Catalog has ${catalogs.total} records`}
            </div>
            <div className="source-title">{catalogListing.join(", ")}</div>
          </React.Fragment>
        );
      }}
    </Query>
  );
};
