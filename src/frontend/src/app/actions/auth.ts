"use server"

import { PayloadError, commitMutation, graphql } from "relay-runtime";
import { authCreateLoginMutation, authCreateLoginMutation$data } from "@/__generated__/authCreateLoginMutation.graphql";

import { cookies } from "next/headers";
import { environment } from "@/app/config/relay";
import { redirect } from "next/navigation";

type FormState = {
    message?: string;
} | undefined;

const loginMutation = graphql`
    mutation authCreateLoginMutation($input: GalleryCreateLoginInput!) {
        createLogin(input: $input) {
            token
        }
    }
`;

const LOGIN_ERROR_MESSAGE = "Invalid email or password. Please try again.";

export async function login(state: FormState, formData: FormData): Promise<FormState> {
    const promise = new Promise<{ response: authCreateLoginMutation$data, errors: readonly PayloadError[] | null | undefined }>((resolve, reject) => {
        commitMutation<authCreateLoginMutation>(environment, {
            mutation: loginMutation,
            variables: {
                input: {
                    email: formData.get("email") as string,
                    password: formData.get("password") as string,
                }
            },
            onCompleted: async (response, errors) => {
                resolve({
                    errors, response
                });
            }
        })
    });

    const { errors, response } = await promise;
    if (errors) {
        console.error("Login mutation errors:", errors);
        const message = errors.map(error => error.message).join(", ");
        return { message: message || LOGIN_ERROR_MESSAGE };
    }

    if (!response?.createLogin) {
        return { message: LOGIN_ERROR_MESSAGE };
    }

    if (response.createLogin?.token) {
        const cookieStore = await cookies();
        cookieStore.set("token", response.createLogin.token, {
            secure: true,
            path: "/",
        });

        redirect("/");
    } else {
        return { message: LOGIN_ERROR_MESSAGE };
    }
}