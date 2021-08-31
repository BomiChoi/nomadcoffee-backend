import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        uploadPhoto(file: Upload!, shopId: Int!) : MutationResponse!
    }
`;