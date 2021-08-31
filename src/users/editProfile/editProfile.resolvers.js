import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

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
                    avatar,
                    githubUsername,
                },
                { loggedInUser }
            ) => {
                let avatarURL = null;
                if (avatar) {
                    avatarURL = await uploadToS3(avatar, loggedInUser.id, "avatars");
                }
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const updatedUser = await client.user.update({
                    where: { id: loggedInUser.id },
                    data: {
                        username,
                        email,
                        name,
                        location,
                        githubUsername,
                        ...(uglyPassword && { password: uglyPassword }),
                        ...(avatarURL && { avatarURL }),
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