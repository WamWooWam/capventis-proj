"use client"

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";
import { PayloadError, graphql } from "relay-runtime";
import { UploadDialogGetKeyMutation, UploadDialogGetKeyMutation$data } from "@/__generated__/UploadDialogGetKeyMutation.graphql";

import Button from "@/components/Button";
import { useMutation } from "react-relay";

const getUploadKeyMutation = graphql`
    mutation UploadDialogGetKeyMutation($params: GalleryCreateImageInput!) {
        createImage(input: $params) {
            token
        }
    }
`

type UploadDialogProps = {
    albumId: string
} & Exclude<DialogProps, { title: string }>;

type UploadingFile = {
    key: string;
    isUploaded: boolean; // todo: progress
    thumb: string;
}

export default function UploadDialog({ albumId, isOpen, onClosed }: UploadDialogProps) {
    const ref = useRef<HTMLInputElement>(null);
    const [getUploadKeys, isGettingUploadKeys] = useMutation<UploadDialogGetKeyMutation>(getUploadKeyMutation)
    const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

    const doUploads = (files: File[]) => new Promise((resolve, reject) => {
        const uploads = files.map((f, i) => ({
            name: f?.name ?? `IMG_${i.toString().padStart(4, '0')}`,
            description: ""
        }))

        if (!uploads.length) {
            reject();
        }

        const onCompleted = (response: UploadDialogGetKeyMutation$data, errors: PayloadError[] | null) => {
            if (errors) {
                // TODO: oops!
                reject(errors);
                return;
            }

            const keys = [...response.createImage!.map(r => r!.token)]
            for (let i = 0; i < keys.length; i++) {
                setUploadingFiles((f) => [...f, {
                    key: keys[i],
                    isUploaded: false,
                    thumb: URL.createObjectURL(files[i])
                }])
            }

            const fetches = []
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let file = files[i];

                const data = new FormData()
                data.append('image', file)

                const headers = new Headers();
                headers.append("Authorization", key);

                const promise = fetch(`${process.env.NEXT_PUBLIC_HOST}static/image`, {
                    method: 'POST',
                    body: data,
                    headers,
                }).then((r) => {
                    setUploadingFiles((f) => f.map(u => {
                        if (u.key === key) {
                            return { ...u, isUploaded: true };
                        }

                        return u;
                    }));
                })

                fetches.push(promise);
            }

            Promise.all(fetches)
                .then(resolve)
                .catch(reject);
        }

        getUploadKeys({
            variables: {
                params: {
                    album: albumId,
                    requests: uploads
                }
            },
            onCompleted
        });
    })

    const onDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.dataTransfer.effectAllowed = isGettingUploadKeys ? "none" : "copy"
    }

    const onDrop = async (e: DragEvent) => {
        e.preventDefault()

        let files = [];
        if (e.dataTransfer.items) {
            for (const item of e.dataTransfer.items) {
                if (item.kind === 'file')
                    files.push(item.getAsFile()!);
            }
        } else {
            files = [...e.dataTransfer.files];
        }

        await doUploads(files);
    }

    const onUploadClick = () => {
        if (!ref.current)
            return;

        ref.current.click();
    }

    const onSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const files = [...ref.current!.files!];
        doUploads(files);
    }

    // nice to know react isn't up to the baseline 2023 standards
    useEffect(() => {
        const input = ref.current;
        if (!input) return;

        const onCancel = (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
        }

        input.addEventListener('cancel', onCancel);

        return () => {
            input.removeEventListener('cancel', onCancel);
        }
    })

    return (
        <Dialog title="Upload" size="large" isOpen={isOpen} onClosed={onClosed}>
            <input ref={ref} type="file" className="hidden" onChange={onSelected} accept="image/*" multiple />
            <div className="flex flex-row h-full"
                onDragOver={onDragOver}
                onDrop={onDrop}>
                <div className="h-full flex-3/4 mr-2 bg-gray-100 dark:bg-gray-800 rounded-xl grid overflow-y-auto">
                    <div className="grid gap-2 grid-cols-1 lg:grid-cols-3">
                        {uploadingFiles.map(f => {
                            const uploadStyle = f.isUploaded ? "opacity-100" : "opacity-50";
                            return <img key={f.key}
                                src={f.thumb}
                                className={`object-contain transition-opacity rounded-md object-bottom ${uploadStyle}`} />
                        })}
                    </div>
                </div>
                <div className="h-full flex-1/4 ml-2 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col text-center items-center justify-center">
                    <p>Drag here to upload!</p>
                    <p className="text-xs my-2">or</p>
                    <Button onClick={onUploadClick}>Open Files</Button>
                </div>
            </div>
        </Dialog>
    )
}