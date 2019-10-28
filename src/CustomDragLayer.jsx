import React from "react";
import { useDragLayer } from "react-dnd";
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};
function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
const CustomDragLayer = props => {
  const {
    itemType,
    isDragging,
    // item,
    initialOffset,
    currentOffset,
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  // function renderItem(stroke) {
  //   switch (itemType) {
  //     case ItemTypes.KNIGHT:
  //       // return <BoxDragPreview title={item.title} />
  //       // return <Knight />
  //       return (
  //         <div
  //           style={{
  //             fontSize: 25,
  //             fontWeight: "bold",
  //             cursor: "move",
  //             color: stroke
  //           }}
  //         >
  //           ♘
  //         </div>);
  //     // return null
  //     default:
  //       return null;
  //   }
  // }

  if (!isDragging) {
    return null;
  }

  // const stroke = props.black ? "white" : "black";

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        {/* {renderItem(stroke)} */}
        ♘
      </div>
    </div>
  );
};
export default CustomDragLayer;
