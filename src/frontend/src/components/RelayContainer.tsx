// so im not a huge fan of this
// if i'm understanding correctly, having "use client" here on a parent component of... everything
// basically nullifies all SSR

"use client"

import { PropsWithChildren } from "react"
import { RelayEnvironmentProvider } from "react-relay"
import { environment } from "@/app/config/relay";

export default function RelayContainer({ children }: PropsWithChildren) {
    return (
        <RelayEnvironmentProvider environment={environment}>
            {children}
        </RelayEnvironmentProvider>
    )
}