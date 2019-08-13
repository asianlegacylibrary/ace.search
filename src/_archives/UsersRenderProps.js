import React from "react";
import { Query } from "react-apollo";
import query from "../queries/getUserList";

export default () => {
  return (
    <Query query={query}>
      {({ data, loading, error }) => {
        console.log(data, loading, error);
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error...</div>;
        }
        return <div>{data.users.map(p => p.firstName).join(", ")}</div>;
      }}
    </Query>
  );
};
