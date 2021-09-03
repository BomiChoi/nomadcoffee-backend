import client from "../../client";

export default {
    Query: {
        searchCoffeeShops: async (_, { keyword, offset }) => {
            const result = client.coffeeShop.findMany({
                where: {
                    name: {
                        startsWith: keyword,
                    },
                },
                take: 5,
                skip: offset ? offset : 0,
            })
            return result;
        },
    },
};