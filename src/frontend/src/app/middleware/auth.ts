"use server"

import 'server-only'

import { fetchQuery, graphql } from 'relay-runtime'

import { authGetUserQuery } from '@/__generated__/authGetUserQuery.graphql'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { environment } from '../config/relay'

const userQuery = graphql`
    query authGetUserQuery {
        user {
            id, 
            name
        }
    }
`

export const getUser = cache(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    const response = await fetchQuery<authGetUserQuery>(environment, userQuery, {})
        .toPromise();


    if (response?.user) {
        return response.user;
    }

    return null;
})