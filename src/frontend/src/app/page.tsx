import Albums from './Albums';
import { getUser } from './middleware/auth';
import { redirect } from 'next/navigation';

export default async function page() {
    const user = await getUser();
    if (!user) {
        redirect("/login");
    }

    return <Albums name={user.name} />
}