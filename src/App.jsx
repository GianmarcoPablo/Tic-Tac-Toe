import { useState,useEffect } from "react";
import { Square } from "./components/Square";
import {TURNS } from "./utils";
import confetti from "canvas-confetti";
import { WinnerModal } from "./components/WinnerModal";
import { checkWiner, checkEndGame } from "./board";

export const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));

    const [turn, setTurn] = useState(TURNS.X);
    const [winner, setWinner] = useState(null);


    
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        window.localStorage.removeItem("board");
        window.localStorage.removeItem("turn");
    };

    useEffect(() => {


        const boardData = window.localStorage.getItem("board");
        const turnData = window.localStorage.getItem("turn");
        if (boardData && turnData) {
            setBoard(JSON.parse(boardData));
            setTurn(JSON.parse(turnData));
        }
    }, []);



    const updateBoard = (index) => {
        if (board[index] || winner) return; //si board ya tiene algo no se hace el resto del codigo
        const newBoard = [...board];
        newBoard[index] = turn; // el indice el turno va ser x o y
        setBoard(newBoard);

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
        //guardar aqui partida
        window.localStorage.setItem("board", JSON.stringify(newBoard));
        window.localStorage.setItem("turn", JSON.stringify(newTurn));
        //revisar si hay un ganador
        const newWiner = checkWiner(newBoard);
        if (newWiner) {
            confetti();
            setWinner(newWiner);
            return;
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
        }
        //si no hay ganador y si el tablero esta lleno
        //if(!newWiner && !newBoard.includes(null)) setWinner(false)
    };

    return (
        <main className="board">
            <h1>Michi</h1>
            <button onClick={resetGame}>Reset del juego</button>
            <section className="game">
                {board.map((square, index) => (
                    <Square key={index} index={index} updateBoard={updateBoard}>
                        {square}
                    </Square>
                ))}
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame}/>
        </main>
    );
};
