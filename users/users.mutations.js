import bcrypt, { hash } from "bcrypt";
import client from "../client";

export default {
    Mutation: {
        createAccount: async (_, {
            username,
            email,
            name,
            location,
            password,
            avatarURL,
            githubUsername,
        }) => {
            try {
                // check if username or email are already on DB
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            { username }, { email }
                        ]
                    }
                });
                // hash password
                const uglyPassword = await bcrypt.hash(password, 10);
                // save and return result
                const newUser = await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        location,
                        password: uglyPassword,
                        avatarURL,
                        githubUsername,
                    },
                });
                console.log(newUser);
                return { ok: true }
            } catch (error) {
                console.log(error);
                return { ok: false, error: error.message };
            }
        },
    },
};