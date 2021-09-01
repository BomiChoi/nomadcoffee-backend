import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deletePhoto: protectedResolver(
            async (_, { id }, { loggedInUser }) => {
                const photo = await client.coffeeShopPhoto.findUnique({
                    where: {
                        id,
                    },
                    select: {
                        shop: {
                            select: {
                                userId: true,
                            }
                        }
                    }
                });
                if (!photo) {
                    return {
                        ok: false,
                        error: "Photo not found."
                    };
                } else if (photo.shop.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not authorized.",
                    };
                } else {
                    await client.coffeeShopPhoto.delete({
                        where: {
                            id,
                        },
                    });
                    return {
                        ok: true,
                    };
                }
            }
        ),
    },
};