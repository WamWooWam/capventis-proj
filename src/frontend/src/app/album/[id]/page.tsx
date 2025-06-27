import { use } from 'react';
import AlbumPage from './Album';

export default function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <AlbumPage id={id} />
}