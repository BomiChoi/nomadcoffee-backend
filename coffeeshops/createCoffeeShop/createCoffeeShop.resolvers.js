import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../coffeeshops.utils";

export default {
    Mutation: {
        createCoffeeShop: protectedResolver(
            async (
                _,
                { name, latitude, longitude, categoryTxt },
                { loggedInUser }
            ) => {
                let categoryObj = [];
                if (categoryTxt) {
                    // parse categories
                    categoryObj = processHashtags(categoryTxt);
                }
                // save coffeeshop with the parsed categories
                return client.coffeeShop.create({
                    data: {
                        name,
                        latitude,
                        longitude,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(categoryObj.length > 0 && {
                            categories: {
                                connectOrCreate: categoryObj,
                            },
                        }),
                    },
                });
            }
        ),
    },
};