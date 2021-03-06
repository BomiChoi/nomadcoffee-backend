import client from "../../client";

export default {
    Query: {
        searchUsers: async (_, { keyword, offset }) => {
            const result = client.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
                take: 5,
                skip: offset ? offset : 0,
            });
            return result;
        },
    },
};