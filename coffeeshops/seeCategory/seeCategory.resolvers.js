import client from "../../client";

export default {
    Query: {
        seeCategory: async (_, { name, lastId }) => {
            const shops = await client.category
                .findUnique({ where: { name } })
                .shops();
            return shops;
        },
    },
};