import { Square } from "./square";

export function Board( board, updateBoard ) {
  return (
    <section className="game">
      {board.map((square, index) => (
        <Square key={index} index={index} updateBoard={updateBoard}>
          {square}
        </Square>
      ))}
    </section>
  );
}
