import React from "react";
import { DisplayAsSolidColor } from "./Shaders";

import OverlayBorder from "./chessImages/OverlayBorder2.png";

const Overlay = ({ color, opacity = .5 }) => {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: 1,
                opacity,
                // backgroundColor: color,
            }}

        >
            <DisplayAsSolidColor style={{
                display: "block",
            }}
                imgSrc={OverlayBorder} color={color}></DisplayAsSolidColor>
        </div>
    );
};
export default Overlay;