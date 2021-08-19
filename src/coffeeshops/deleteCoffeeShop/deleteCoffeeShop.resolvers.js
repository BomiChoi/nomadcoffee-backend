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
                const deletedShop = await client.coffeeShop.delete({
                    where: {
                        id,
                        userId: loggedInUser.id
                    },
                });
                if (deletedShop) {
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