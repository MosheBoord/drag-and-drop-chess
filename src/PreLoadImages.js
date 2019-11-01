import React from "react";
import OverlayBorder from "./chessImages/OverlayBorder.png";
import X3 from "./chessImages/2x3.png";

export default function PreLoadImages() {
    return (
        <>
            <img src={OverlayBorder} style={{ visibility: "hidden" }} />
            <img src={X3} style={{ visibility: "hidden" }} />
        </>
    );
}