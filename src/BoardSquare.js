import React, { useState } from "react";
import Square from "./Square";
import { isLegalMove, makeMove } from "./Game";
import { ItemTypes } from "./Constants";
import { DropSurface, over } from "./DragNDrop";
import Overlay from "./Overlay";
import { connect } from "react-redux";

function BoardSquare(props) {
    const black = (props.x + props.y) % 2 === 1;
    const className = black ? "black" : "white";
    const surface = { id: "" + props.x + props.y, coordinates: [props.x, props.y] };

    const [isOver, setIsOver] = useState(false);
    const [canDrop, setCanDrop] = useState(false);
    surface.setIsOver = setIsOver;
    surface.canDrop = (item, truthValue) => {
        setCanDrop(truthValue && isLegalMove(item.coordinates, [props.x, props.y]));

    };

    // console.log(canDrop);
    let overlay = null;
    if (isOver && !canDrop) {
        overlay = <Overlay color="Aqua" opacity={.9} p />;
    } else if (!isOver && canDrop) {
        overlay = <Overlay color="yellow" opacity={.9} />;
    } else if (isOver && canDrop) {
        overlay = <Overlay color="Aqua" opacity={.9} p />;
    }

    return (
        <DropSurface surface={surface}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    textAlign: "center"
                }}
            >
                <Square className={className} black={black}>{props.children}</Square>
                {/* {isOver && !canDrop && <Overlay color="red" opacity={.9} />} */}
                {/* {!isOver && canDrop && <Overlay color="yellow" opacity={.9} />} */}
                {/* {isOver && canDrop && <Overlay color="Aqua" opacity={.9} p />} */}
                {overlay}
                {/* {isOver && !canDrop ? <Overlay color="red" opacity={.9} /> : !isOver && canDrop ? <Overlay color="yellow" opacity={.9} /> : isOver && canDrop ? <Overlay color="Aqua" opacity={.9} p /> : null} */}
            </div>
        </DropSurface>
    );
}

const mapStateToProps = state => ({
    dragIsOver: state.dragIsOver,
    draggedItem: state.draggedItem
});

const connectedBoardSquare = connect(mapStateToProps)(BoardSquare);

export default connectedBoardSquare;