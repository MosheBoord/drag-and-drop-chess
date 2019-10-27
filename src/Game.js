import Chess from "chess.js";

// The chess instance represents the entire game.
const chess = new Chess();

// The current board state.
let boardState = chess.board();

// observer represents the root react element to be rerendered when the board state changes.
// (or on a canceled drag)
let observer = null;

// This function generates a random move and plays it.
export function makeRandomMove() {
    if (!chess.game_over()) {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
        boardState = chess.board();
        emitChange();
    } else {
        chess.reset();
    }
}

// This function works but I have not looked into what the paramater is to constitute a move.
export function makeMove(move) {
    chess.move(move);
    boardState = chess.board();
    emitChange();
}



// For every change on board state rerender observer.
function emitChange() {
    observer(boardState);
}

// This function sets observer.
export function observe(o) {
    if (observer) {
        throw new Error("Multiple observers not implemented.");
    }

    observer = o;
    emitChange();
}