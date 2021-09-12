import client from "../../client";

export default {
    Query: {
        seeCoffeeShops: async (_, { offset }) => {
            const shops = await client.coffeeShop.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                take: 5,
                skip: offset ? offset : 0,
            });
            return shops;
        },
    },
};