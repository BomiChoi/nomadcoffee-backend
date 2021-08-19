import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        deleteAccount: protectedResolver(
            async (
                _,
                { },
                { loggedInUser }
            ) => {
                const deletedUser = await client.user.delete({
                    where: { id: loggedInUser.id },
                });
                if (deletedUser) {
                    return { ok: true };
                } else {
                    return {
                        ok: false,
                        error: "Could not delete account."
                    };
                }
            }
        ),
    },
};