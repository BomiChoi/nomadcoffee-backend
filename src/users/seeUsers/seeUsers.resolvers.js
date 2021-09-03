import client from "../../client";

export default {
    Query: {
        seeUsers: async (_, { offset }) => {
            const result = client.user.findMany({
                take: 5,
                skip: offset ? offset : 0,
            });
            return result;
        },
    },
};