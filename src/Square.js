import React from "react";

function Square({ black, children }) {
    const fill = black ? "green" : "beige";
    const stroke = black ? "white" : "black";

    return (
        <div
            style={{
                backgroundColor: fill,
                color: stroke,
                width: "100%",
                height: "100%",
            }}
        >
            <div>
                {children}
            </div>
        </div >
    );
}

export default Square;