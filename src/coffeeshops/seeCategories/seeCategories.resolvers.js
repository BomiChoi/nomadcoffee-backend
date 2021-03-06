import client from "../../client";

export default {
    Query: {
        seeCategories: async (_, { offset }) => {
            const categories = await client.category.findMany({
                take: 5,
                skip: offset ? offset : 0,
            });
            return categories;
        },
    },
};