import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deleteCoffeeShop: protectedResolver(
            async (
                _,
                { id },
                { loggedInUser }
            ) => {
                const shop = await client.coffeeShop.findFirst({
                    where: {
                        id,
                        userId: loggedInUser.id
                    },
                });
                if (shop) {
                    await client.coffeeShop.delete({
                        where: {
                            id
                        },
                    });
                    return {
                        ok: true
                    };
                } else {
                    return {
                        ok: false,
                        error: "Could not delete CoffeeShop."
                    };
                }

            }
        ),
    },
};