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
        following(offset: Int): [User]
        followers(offset: Int): [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
        shops(offset: Int): [CoffeeShop]
    }
`;