import client from "../client";

export default {
    User: {
        following: async ({ username }, { lastId }) => {
            const following = await client.user
                .findUnique({ where: { username } })
                .following({
                    take: 5,
                    skip: lastId ? 1 : 0,
                    ...(lastId && { cursor: { id: lastId } }),
                });
            return following;
        },
        followers: async ({ username }, { lastId }) => {
            const followers = await client.user
                .findUnique({ where: { username } })
                .followers({
                    take: 5,
                    skip: lastId ? 1 : 0,
                    ...(lastId && { cursor: { id: lastId } }),
                });
            return followers;
        },
        totalFollowing: ({ id }) => client.user.count({
            where: {
                followers: {
                    some: {
                        id,
                    },
                },
            },
        }),
        totalFollowers: ({ id }) => client.user.count({
            where: {
                following: {
                    some: {
                        id,
                    },
                },
            },
        }),
        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            const exists = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {
                            id,
                        },
                    },
                },
            });
            return exists.length !== 0;
        },
        shops: async ({ username }, { lastId }) => {
            const shops = await client.user
                .findUnique({ where: { username } })
                .shops({
                    take: 5,
                    skip: lastId ? 1 : 0,
                    ...(lastId && { cursor: { id: lastId } }),
                });
            return shops;
        },
    },
};