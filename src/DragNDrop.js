/* eslint-disable react/display-name */
import React from "react";
import store, { initiateDrag, initiateDrop, dragEnd, dragEntered } from "./store";
import { makeMove, checkPromotion } from "./Game";

// const dragAndDropManager = new dragAndDropManager();
const dragAndDropManager = {
    draggedItem: null,
    draggedSurface: null,
    dropSurface: null,
    draggableItems: [],
    dragSurfaces: [],
    dropSurfaces: [],
};

class DraggableItem {
    constructor(item) {
        this.item = item;
        this.el = null;
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
        this.setRef = this.setRef.bind(this);
        this.dragMouseDown = this.dragMouseDown.bind(this);
        this.elementDrag = this.elementDrag.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
    }

    setRef(el) {
        if (el) {
            this.el = el;
            for (let i = 0; i < dragAndDropManager.draggableItems.length; i++) {
                if (dragAndDropManager.draggableItems[i].el === el) {
                    return;
                }
            }
            dragAndDropManager.draggableItems.push(this);
            this.el.onmousedown = this.dragMouseDown;
        }
    }

    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the element starting position
        this.startingTopPosition = this.el.offsetTop;
        this.startingLeftPosition = this.el.offsetLeft;
        // get intitial color for reverting on cancel drag
        this.color = this.el.style.color;
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
        // insure that the dragged element is ignore for pointer (mouse) events to allow events to pass
        // through to elements beneath
        this.el.style.pointerEvents = "none";
        // set the global dragged element to current dragged element
        dragAndDropManager.draggedItem = this.item;
        // Tell the store which item is being dragged.
        store.dispatch(initiateDrag(this.item));
    }

    elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        // set the element's new position:
        this.el.style.top = (this.el.offsetTop - this.pos2) + "px";
        this.el.style.left = (this.el.offsetLeft - this.pos1) + "px";
    }

    closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        const from = dragAndDropManager.draggedItem.coordinates;
        const to = dragAndDropManager.dropSurface.coordinates;
        console.log(dragAndDropManager.draggedItem, dragAndDropManager.dropSurface);
        const isPromotion = checkPromotion(from, to)
        if (isPromotion) {
            console.log('yes')
            console.log(document)
        }
        makeMove(from, to);

        // this feature is not ready yet

        // get last element position
        // this.transitionTopToStartingPosition = (this.el.offsetTop - this.startingTopPosition) / 50;
        // this.transitionLeftToStartingPosition = (this.el.offsetLeft - this.startingLeftPosition) / 50;

        dragAndDropManager.draggedItem = null;
        this.el.style.pointerEvents = "";

        // resets element as a result of canceled drag (as of now every drag is considered to be cancelled)
        this.el.style.top = this.startingTopPosition;
        this.el.style.left = this.startingLeftPosition;
        this.el.style.color = this.color;
        // store.dispatch(initiateDrop());

        store.dispatch(dragEnd());
    }

    dragElement() {

    }
}

// class DragSurfaceEntity {
//     constructor(surface) {
//         this.el = null;
//         this.surface = surface;
//         this.setRef = this.setRef.bind(this);
//         this.onMouseEntered = this.onMouseEntered.bind(this);
//     }

//     setRef(el) {
//         if (el) {
//             this.el = el;
//             for (let i = 0; i < dragAndDropManager.dragSurfaces.length; i++) {
//                 if (dragAndDropManager.dragSurfaces[i].el === el) {
//                     return;
//                 }
//             }
//             dragAndDropManager.dragSurfaces.push(this);
//             this.el.onmouseenter = this.onMouseEntered;
//         }
//     }

//     onMouseEntered() {
//         const { draggedItem } = store.getState();
//         if (draggedItem.type) {
//             store.dispatch(dragEntered(this.surface));
//         }
//     }
// }

class DropSurfaceEntity {
    constructor(surface) {
        this.el = null;
        this.surface = surface;
        this.setRef = this.setRef.bind(this);
        this.onMouseEntered = this.onMouseEntered.bind(this);
    }

    setRef(el) {
        if (el) {
            this.el = el;
            for (let i = 0; i < dragAndDropManager.dropSurfaces.length; i++) {
                if (dragAndDropManager.dropSurfaces[i].el === el) {
                    return;
                }
            }
            dragAndDropManager.dropSurfaces.push(this);
            this.el.onmouseenter = this.onMouseEntered;
        }
    }

    onMouseEntered() {
        // const { draggedItem } = store.getState();
        // if (draggedItem.type) {
        //     store.dispatch(dragEntered(this.surface));
        // }
        dragAndDropManager.dropSurface = this.surface;
    }
}

export function useDrag(item) {
    const dragItem = new DraggableItem(item);
    return dragItem.setRef;
}

// export function useDragSurface(surface) {
//     const dragSurface = new DropSurfaceEntity(surface);
//     return dragSurface.setRef;
// }

export function useDropSurface(surface) {
    const dropSurface = new DropSurfaceEntity(surface);
    return dropSurface.setRef;
}

export class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.item = props.item;
    }

    render() {
        const refFunc = useDrag(this.item);
        return (
            <div
                ref={refFunc}
                style={{
                    position: "absolute",
                    zIndex: 9999,
                }}
            >
                {this.props.children}
            </div >
        );
    }
}

// export class DragSurface extends React.Component {
//     constructor(props) {
//         super(props);
//         this.surface = props.surface;
//     }

//     render() {
//         const refFunc = useDragSurface(this.surface);
//         return (
//             <div
//                 className={this.props.className}
//                 ref={refFunc}
//             >
//                 {this.props.children}
//             </div >
//         );
//     }
// }

export class DropSurface extends React.Component {
    constructor(props) {
        super(props);
        this.surface = props.surface;
    }

    render() {
        const refFunc = useDropSurface(this.surface);
        return (
            <div
                className={this.props.className}
                ref={refFunc}
            >
                {this.props.children}
            </div >
        );
    }
}