import React from "react";
import OverlayBorder from "./chessImages/OverlayBorder.png";

export default function PreLoadImages() {
    return (
        <img src={OverlayBorder} style={{ visibility: "hidden" }} />
    );
}