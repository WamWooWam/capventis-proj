import AlbumPage from './Album';
import { getUser } from '@/app/middleware/auth';
import { redirect } from 'next/navigation';
import { use } from 'react';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser();
    if (!user) {
        redirect("/login");
    }

    return <AlbumPage id={id} />
}