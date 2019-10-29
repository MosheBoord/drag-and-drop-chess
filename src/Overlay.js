import React from "react";
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
                backgroundColor: color,
            }}
        />
    );
};
export default Overlay;