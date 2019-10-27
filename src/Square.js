import React from "react";
import { makeDragSurface, DragSurface } from "./DragNDrop";
import Wrapper from "./Wrapper";

function Square({ black, children }) {
    const fill = black ? "black" : "white";
    const stroke = black ? "white" : "black";

    return (
        <DragSurface >
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
        </DragSurface>
    );
}

// const wrapper = new Wrapper(Square);
// const wrappedSquare = wrapper.wrapWith(makeDragSurface);

// export default wrappedSquare;
export default Square;