import { PropsWithChildren, memo } from "react";

type ButtonProps = {
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

const Button = memo((props: PropsWithChildren<ButtonProps>) => {
    const className = "rounded-sm bg-blue-600 hover:bg-blue-500 hover:-translate-0.25 hover:drop-shadow-sm active:bg-blue-700 text-white border-2 px-4 py-2";
    const type = props.type ?? "button";

    if (type === "button") {
        return (
            <button onClick={props.onClick}
                disabled={props.disabled}
                className={className}>
                {props.children}
            </button>
        )
    }

    return (
        <input type={props.type ?? "button"}
            disabled={props.disabled}
            onClick={props.onClick}
            className={className} />
    )
});

export default Button;