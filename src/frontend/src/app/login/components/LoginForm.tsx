'use client'

import Button from '@/components/Button'
import { login } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined)

    return (
        <form action={action}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="hi@there.com" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {state?.message && <p className="text-red-500">{state.message}</p>}
            <Button disabled={pending} type="submit">
                Login
            </Button>
        </form>
    )
}