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
        shops: ({ id }, { offset }) => {
            return client.category.findUnique({
                where: { id },
            }).shops({
                take: 5,
                skip: offset ? offset : 0,
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