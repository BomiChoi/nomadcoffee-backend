import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
    Mutation: {
        editPhoto: protectedResolver(
            async (_, { file, id }, { loggedInUser }) => {
                const oldPhoto = await client.coffeeShopPhoto.findUnique({
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
                if (!oldPhoto) {
                    return {
                        ok: false,
                        error: "Photo not found."
                    };
                } else if (oldPhoto.shop.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not authorized.",
                    };
                } else {
                    const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
                    await client.coffeeShopPhoto.update({
                        where: { id },
                        data: {
                            url: fileUrl,
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