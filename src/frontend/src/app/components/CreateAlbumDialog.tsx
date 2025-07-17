import Dialog, { DialogProps } from "@/components/Dialog";
import { FormEvent, useState } from "react";

import { CreateAlbumDialogMutation } from "@/__generated__/CreateAlbumDialogMutation.graphql";
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import { useRouter } from "next/navigation";

const createAlbumMutation = graphql`
    mutation CreateAlbumDialogMutation($input: GalleryCreateAlbumInput!) {
        createAlbum(input: $input) {
            id
        }
    }
`

export default function CreateAlbumDialog({ isOpen, onClosed }: DialogProps) {
    const [createAlbum, isCreatingAlbum] = useMutation<CreateAlbumDialogMutation>(createAlbumMutation)
    const [albumName, setAlbumName] = useState("");

    const router = useRouter();
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        createAlbum({
            variables: {
                input: {
                    name: albumName
                }
            },
            onCompleted(response, errors) {
                router.push(`/album/${response.createAlbum?.id}`)
                onClosed(true);
            },
        })
    }

    return (
        <Dialog title="Create Album" size="small" isOpen={isOpen} onClosed={onClosed}>
            <form className="flex flex-col h-full" onSubmit={onSubmit}>
                <label htmlFor="albumName" className="-mt-1 mb-1">Album Name</label>
                <input type="text" className="rounded-sm bg-gray-200 hover:bg-gray-100 active:bg-gray-250 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 text-white border-2 px-4 py-2"
                    name="albumName"
                    placeholder="Album Name"
                    value={albumName}
                    disabled={isCreatingAlbum}
                    onChange={(e) => setAlbumName(e.target.value)} />
                <div className="flex-1" />
                <input type="submit"
                    value="Create"
                    disabled={isCreatingAlbum}
                    className="rounded-sm bg-blue-600 hover:bg-blue-500 hover:-translate-0.25 hover:drop-shadow-sm active:bg-blue-700 text-white border-2 px-4 py-2" />
            </form>
        </Dialog>
    )
}