import React from "react";
import { ColorScheme } from "types";

type IconProps = {
    colorStroke?:ColorScheme
}

const LinkDivider: React.FC<IconProps> = ({colorStroke = ColorScheme.vibrantPlum}) => {

    return (
        <>
            <svg width="14" height="16" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 0V24M1 0V24" stroke={colorStroke} strokeWidth="2" />
            </svg>

        </>
    )
}

export default LinkDivider;