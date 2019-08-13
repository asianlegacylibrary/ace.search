import React from "react";
import { graphql } from "react-apollo";
import query from "../queries/getUserList";

const UsersHOC = ({ data }) => {
  console.log(data);
  if (data.loading) {
    return <div>Loading...</div>;
  }
  if (data.error) {
    return <div>Error...</div>;
  }
  return <div>{data.users.map(p => p.firstName).join(", ")}</div>;
};

export default graphql(query)(UsersHOC);
