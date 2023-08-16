import { WINNER_COMBOS } from "./utils";
export const checkWiner = (boardToChecked) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToChecked[a] &&
            boardToChecked[a] === boardToChecked[b] &&
            boardToChecked[a] === boardToChecked[c] //si los 3 son iguales
        ) {
            return boardToChecked[a];
        }
    }
    return null;
};

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
};

