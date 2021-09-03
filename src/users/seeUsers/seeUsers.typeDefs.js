import { gql } from "apollo-server-express";

export default gql`
    type Query {
        seeUsers(offset: Int):[User]
    }
`;