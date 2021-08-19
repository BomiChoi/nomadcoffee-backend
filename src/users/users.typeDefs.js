import { gql } from "apollo-server-express";

export default gql`
    type User{
        id: String!
        username: String!
        email: String!
        name: String!
        location: String!
        password: String!
        avatarURL: String
        githubUsername: String!
        createdAt: String!
        updatedAt: String!
        following(lastId: Int): [User]
        followers(lastId: Int): [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
        shops(lastId: Int): [CoffeeShop]
    }
`;