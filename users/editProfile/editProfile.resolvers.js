import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                {
                    username,
                    email,
                    name,
                    location,
                    password: newPassword,
                    avatarURL,
                    githubUsername,
                },
                { loggedInUser }
            ) => {
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const updatedUser = await client.user.update({
                    where: { id: loggedInUser.id },
                    data: {
                        username, email, name, location, avatarURL, githubUsername, ...(uglyPassword && { password: uglyPassword })
                    },
                });
                if (updatedUser) {
                    return { ok: true }
                } else {
                    return {
                        ok: false,
                        error: "Could not update profile."
                    }
                }
            }
        ),
    },
};