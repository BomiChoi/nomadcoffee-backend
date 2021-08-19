import { gql } from "apollo-server-express";

export default gql`
    type deleteAccounteResult {
        ok: Boolean!
        error: String
    }
    type Mutation{
        deleteAccount: deleteAccounteResult!
    }
`;