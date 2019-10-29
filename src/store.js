import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";

//ACTION TYPES

const INITIATE_DRAG = "INITIATE_DRAG";
const BOARD_UPDATE = "BOARD_UPDATE";
const DRAG_END = "DRAG_END";
const DRAG_ENTERED = "DRAG_ENTERED";
const INITIATE_DROP = "INITIATE_DROP";

//ACTION CREATORS

export const initiateDrag = draggedItem => ({
  type: INITIATE_DRAG,
  draggedItem
});

export const initiateDrop = () => ({
  type: INITIATE_DROP,
});

export const dragEnd = () => ({
  type: DRAG_END,
  draggedItem: { coordinates: [] },
});

export const dragEntered = surface => ({
  type: DRAG_ENTERED,
  surface
});

export const boardUpdate = chessBoard => ({
  type: BOARD_UPDATE,
  chessBoard,
});

const chessBoard = [];
for (let x = 0; x < 8; x++) {
  let row = [];
  for (let y = 0; y < 8; y++) {
    row.push({});
  }
  chessBoard.push(row);
}

const initialState = {
  chessBoard,
  draggedItem: { coordinates: [] },
  dragIsOver: { coordinates: [], x: -1, y: -1 },
  checkForMove: false
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case INITIATE_DRAG:
    case DRAG_END:
      return {
        ...prevState,
        draggedItem: action.draggedItem,
        dragIsOver: { x: -1, y: -1 }
      };
    case INITIATE_DROP:
      return {
        ...prevState,
        checkForMove: true
      };
    case DRAG_ENTERED:
      return {
        ...prevState,
        dragIsOver: action.surface
      };
    case BOARD_UPDATE:
      return {
        ...prevState,
        chessBoard: action.chessBoard,
      };
    default:
      return prevState;
  }
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
