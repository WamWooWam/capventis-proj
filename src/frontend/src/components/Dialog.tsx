import { AnimationEvent, PropsWithChildren, memo, useEffect, useRef, useState } from "react";

export type DialogProps = {
    title?: string;
    size?: 'small' | 'medium' | 'large'
    isOpen: boolean;
    onClosed: (isCancelled: boolean) => void;
}

const CloseIcon = memo(() => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
))

const Dialog = ({ title, size, isOpen, onClosed, children }: PropsWithChildren<DialogProps>) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [isClosing, setClosing] = useState(false);

    useEffect(() => {
        console.log("Dialog effect", isOpen);
        if (isOpen) {
            ref.current?.showModal();
        } else {
            setClosing(true);
            setTimeout(() => {
                setClosing(false);
                ref.current?.close();
                onClosed(true);
            }, 100);
        }
    }, [isOpen]);

    let sizeStyle = '';
    switch (size ?? 'large') {
        case 'small':
            sizeStyle = "max-w-[400px] max-h-[300px] screen min-[401x]:rounded-lg";
            break;
        case 'medium':
            sizeStyle = "max-w-[800px] max-h-[600px] screen min-[801px]:rounded-xl";
            break;
        case 'large':
            sizeStyle = "max-w-[1200px] max-h-[800px] screen min-[1201px]:rounded-2xl";
            break;
    };

    if (isClosing) {
        sizeStyle += " closing";
    }

    const onCompleted = (e: AnimationEvent) => {
        if (e.animationName === "hide_desktop") {
            // setClosing(false);
            // onClosed(true);
        }
    }

    return (
        <dialog ref={ref}
            onClose={(e) => onClosed(false)}
            onCancel={(e) => onClosed(true)}
            onAnimationEnd={onCompleted}
            className={`border-0 ${sizeStyle} w-full h-full self-center justify-self-center bg-transparent`}>
            <div className="flex flex-col h-full dark:bg-gray-900 dark:text-white drop-shadow-lg ">
                <div className="flex flex-row min-h-[64px] items-center justify-between px-4 border-b-1 border-gray-100 dark:border-gray-800">
                    <h1 className="text-2xl">{title}</h1>
                    <button className="mx-2" onClick={() => onClosed(false)}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="flex-1 p-4 max-h-[100%] overflow-y-hidden">
                    {children}
                </div>
            </div>
        </dialog>
    );
}

export default Dialog;