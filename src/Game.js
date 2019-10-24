import Chess from "chess.js";

const chess = new Chess();

let boardState = chess.board();
let observer = null;

export function makeMove() {
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


function emitChange() {
    observer(boardState);
}

export function observe(o) {
    if (observer) {
        throw new Error("Multiple observers not implemented.");
    }

    observer = o;
    emitChange();
}