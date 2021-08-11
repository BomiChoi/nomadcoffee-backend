import client from "../../client";

export default {
    Query: {
        seeCoffeeShops: async (_, { lastId }) => {
            const shops = await client.coffeeShop.findMany({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            });
            return shops;
        },
    },
};