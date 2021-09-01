import client from "../client";

export default {
    CoffeeShop: {
        user: ({ userId }) => client.user.findUnique({
            where: { id: userId }
        }),
        categories: ({ id }) => client.category.findMany({
            where: {
                shops: {
                    some: { id },
                },
            },
        }),
        photos: ({ id }) => client.coffeeShopPhoto.findMany({
            where: {
                shop: {
                    id
                },
            },
        }),
    },
    Category: {
        shops: ({ id }, { lastId }) => {
            return client.category.findUnique({
                where: { id },
            }).shops({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            });
        },
        totalShops: ({ id }) => client.coffeeShop.count({
            where: {
                categories: {
                    some: { id },
                },
            },
        }),
    },
};