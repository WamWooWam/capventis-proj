import LoginForm from "./components/LoginForm";
import { getUser } from "../middleware/auth";
import { redirect } from "next/navigation";

export default async function page() {
    const user = await getUser();
    if (user) {
        redirect("/");
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-sm p-4 bg-white dark:bg-gray-900 rounded-xl drop-shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}