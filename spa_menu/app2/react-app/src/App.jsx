import { useState, useEffect } from "react";
import Board from "./components/Board.jsx";

import ferrari from "./assets/ferrari.png";
import mercedes from "./assets/mercedes.png";
import redbull from "./assets/redbull.png";
import mclaren from "./assets/mclaren.png";
import alpine from "./assets/alpine.png";
import aston from "./assets/aston.png";
import haas from "./assets/haas.png";
import visa from "./assets/visa.png";
import cadillac from "./assets/cadilac.png";
import williams from "./assets/williams.png";
import audi from "./assets/audi.png";
import f1 from "./assets/f1.png";

const images = [
  ferrari, mercedes, redbull, mclaren,
  alpine, aston, haas, visa,
  cadillac, williams, audi, f1
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function generateCards() {
  const duplicated = [...images, ...images];
  return shuffle(
    duplicated.map((img, index) => ({
      img,
      id: img,
      uniqueId: index
    }))
  );
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  function newGame() {
    setCards(generateCards());
    setFlipped([]);
    setMatched([]);
  }

  useEffect(() => {
    newGame();
  }, []);

  function handleClick(card) {
    if (flipped.length === 2) return;
    if (flipped.includes(card.uniqueId)) return;
    if (matched.includes(card.id)) return;

    setFlipped([...flipped, card.uniqueId]);
  }

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;

      const c1 = cards.find(c => c.uniqueId === a);
      const c2 = cards.find(c => c.uniqueId === b);

      if (c1.id === c2.id) {
        setMatched(prev => [...prev, c1.id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped]);

  return (
    <div className="container game-container">
      <h1 className="mb-4">F1 Memory Game</h1>

      <button className="btn btn-danger" onClick={newGame}>
        New Game
      </button>

      <Board
        cards={cards}
        flipped={flipped}
        matched={matched}
        handleClick={handleClick}
      />
    </div>
  );
}