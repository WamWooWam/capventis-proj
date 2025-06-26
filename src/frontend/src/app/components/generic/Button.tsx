import { memo, PropsWithChildren } from "react";

type ButtonProps = {

    onClick?: () => void;
}

const Button = memo((props: PropsWithChildren<ButtonProps>) => (
    <button onClick={props.onClick}
            className="rounded-sm bg-blue-600 hover:bg-blue-500 hover:-translate-0.25 hover:drop-shadow-sm active:bg-blue-700 text-white border-2 px-4 py-2">
        {props.children}
    </button>
));

export default Button;