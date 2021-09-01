import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, shopId }, { loggedInUser }) => {
                const shop = await client.coffeeShop.findUnique({
                    where: {
                        id: shopId,
                    },
                    select: {
                        userId: true,
                    },
                });
                console.log(shop.userId, loggedInUser.id);
                if (!shop) {
                    return {
                        ok: false,
                        error: "Shop not found."
                    };
                } else if (shop.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not authorized.",
                    };
                } else {
                    const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
                    await client.coffeeShopPhoto.create({
                        data: {
                            url: fileUrl,
                            shopId
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