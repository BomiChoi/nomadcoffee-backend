import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../coffeeshops.utils";

export default {
    Mutation: {
        editCoffeeShop: protectedResolver(
            async (
                _,
                { id, name, latitude, longitude, categoryTxt },
                { loggedInUser }
            ) => {
                const oldShop = await client.coffeeShop.findFirst({
                    where: {
                        id,
                        userId: loggedInUser.id
                    },
                    include: {
                        categories: {
                            select: {
                                name: true,
                            }
                        }
                    }
                });
                if (!oldShop) {
                    return {
                        ok: false,
                        error: "CoffeeShop not found."
                    };
                }
                await client.coffeeShop.update({
                    where: { id },
                    data: {
                        name,
                        latitude,
                        longitude,
                        categories: {
                            disconnect: oldShop.categories,
                            connectOrCreate: processHashtags(categoryTxt),
                        },
                    },
                });
                return {
                    ok: true
                };
            }
        ),
    },
};