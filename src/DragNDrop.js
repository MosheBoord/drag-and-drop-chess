/* eslint-disable react/display-name */
import React from "react";
import store, { initiateDrag, initiateDrop, dragEnd, dragEntered, promote } from "./store";
import { makeMove, checkPromotion } from "./Game";

// The dragAndDropManager is a local global space to store all information regarding drag and dropping.
// It might make more sence to have everything go through the redux store instead.
const dragAndDropManager = {
    draggedItem: null,
    // currently the next line is not being used
    draggedSurface: null,
    dropSurface: null,
    draggableItems: [],
    // currently the next line is not being used
    dragSurfaces: [],
    dropElements: [],
    dropSurfaces: [],
};

// This represents an item that is draggable. Both the physical node and the logical item.
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
        this.promotionPopUp = store.getState().promotionPopUp
    }

    // This function will be set to the reference of the draggable node to be run on mounting.
    // It is how we keep track of what nodes are already set and how we add event listeners to said nodes.
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

    // This is a simple event listener to detect when the mouse is pressed on draggable item (node).
    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the element starting position
        this.startingTopPosition = this.el.offsetTop;
        this.startingLeftPosition = this.el.offsetLeft;

        // I think this is old code.
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

        for (let i = 0; i < dragAndDropManager.dropSurfaces.length; i++) {
            dragAndDropManager.dropSurfaces[i].canDrop(this.item, true);
        }

        // Tell the store which item is being dragged.
        store.dispatch(initiateDrag(this.item));
    }

    // This is a simple event listener to detect when the mouse is dragging with draggable item (node).
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

    // This is a simple event listener to detect when the mouse is released from draggable item (node).
    async closeDragElement() {
        // This tells the drag surface that the mouse is no longer dragging an item over it.
        if (dragAndDropManager.dropSurface) {
            dragAndDropManager.dropSurface.setIsOver(false);
        }

        for (let i = 0; i < dragAndDropManager.dropSurfaces.length; i++) {
            dragAndDropManager.dropSurfaces[i].canDrop(null, false);
        }

        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        // This is probably the biggest flaw with this file. It references games.js directly, 
        // while it probably should run a drop function that runs the make move function.
        // Regardless once the mouse is released we check if the GAME MOVE is legal (and update the board regardless).
        const from = dragAndDropManager.draggedItem.coordinates;
        const to = dragAndDropManager.dropSurface.coordinates;

        //will return true or false, if we should render the promotion pop up or not
        const toPromote = checkPromotion(from, to);
        if (!toPromote) makeMove(from, to);
        else {
            await store.dispatch(promote(from, to));
            // let promotion = store.getState().promotion.value
            // makeMove(from, to, promotion);
        }

        // this feature is not ready yet

        // get last element position
        // this.transitionTopToStartingPosition = (this.el.offsetTop - this.startingTopPosition) / 50;
        // this.transitionLeftToStartingPosition = (this.el.offsetLeft - this.startingLeftPosition) / 50;

        dragAndDropManager.draggedItem = null;
        this.el.style.pointerEvents = "";

        // resets element as a result of canceled drag
        this.el.style.top = this.startingTopPosition;
        this.el.style.left = this.startingLeftPosition;
        this.el.style.color = this.color;

        store.dispatch(dragEnd());
    }
}

// This represents an entity that is a drop surface. Both the physical node and the logical entity.
class DropSurfaceEntity {
    constructor(surface) {
        this.el = null;
        this.surface = surface;
        if (!dragAndDropManager.dropSurfaces.includes(surface)) {
            dragAndDropManager.dropSurfaces.push(surface);
        }
        this.setRef = this.setRef.bind(this);
        this.onMouseEntered = this.onMouseEntered.bind(this);
    }

    // This function will be set to the reference of the draggable node to be run on mounting.
    // It is how we keep track of what nodes are already set and how we add event listeners to said nodes.
    setRef(el) {
        if (el) {
            this.el = el;
            for (let i = 0; i < dragAndDropManager.dropElements.length; i++) {
                if (dragAndDropManager.dropElements[i].el === el) {
                    return;
                }
            }
            dragAndDropManager.dropElements.push(this);
            this.el.onmouseenter = this.onMouseEntered;
        }
    }

    // This is a simple event listener to detect when the mouse is moved onto a drop surface (node).
    // Somewhere, maybe here we should check to see if we are currently dragging a draggable item.
    onMouseEntered() {
        // This tells the old drag surface that the mouse is no longer dragging an item over it.
        // Really there should be a mouse exit event for this.
        if (dragAndDropManager.dropSurface) {
            dragAndDropManager.dropSurface.setIsOver(false);
        }

        dragAndDropManager.dropSurface = this.surface;

        // Tell drag surface that the mouse is dragging an item over it.
        if (dragAndDropManager.draggedItem) {
            this.surface.setIsOver(true);
        }
    }
}

// As of now this function simply creates a new Draggable Item and returns a ref to be added to the draggable node.
// We may want to make this some sort of hook to attach to any React Class as apposed to being used simply with the Draggable Component.
export function useDrag(item) {
    const dragItem = new DraggableItem(item);
    return dragItem.setRef;
}

// As of now this function simply creates a new Drop Surface and returns a ref to be added to the drop surface node.
// We may want to make this some sort of hook to attach to any React Class as apposed to being used simply with the Drop Surface Component.
export function useDropSurface(surface) {
    const dropSurface = new DropSurfaceEntity(surface);
    return dropSurface.setRef;
}

// This React Component simply wraps the component that needs to be made Draggable.
export class Draggable extends React.Component {
    // This component takes in an item object.
    constructor(props) {
        super(props);
        this.item = props.item;
    }

    // If you want more documentation on this check out the react docs on refs.
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

// This React Component simply wraps the component that needs to be made into a Drop Surface.
export class DropSurface extends React.Component {
    // This component takes in a surface object.
    constructor(props) {
        super(props);
        this.surface = props.surface;
    }

    // If you want more documentation on this check out the react docs on refs.
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
