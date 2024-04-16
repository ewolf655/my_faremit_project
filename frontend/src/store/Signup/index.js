import { Rootapi } from "..";

const Signup = Rootapi.injectEndpoints({
    endpoints: builder => ({
        Signup: builder.mutation({
            query: data => ({
                url: "/auth/Signup",
                method: "POST",
                body: data
            })
        })
    })
});

export const { useSignupMutation } = Signup;
