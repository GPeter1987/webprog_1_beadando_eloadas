import Card from "./card.jsx";

export default function Board({ cards, flipped, matched, handleClick }) {
  return (
    <div className="board">
      {cards.map(card => (
        <Card
          key={card.uniqueId}
          card={card}
          flipped={flipped.includes(card.uniqueId)}
          matched={matched.includes(card.id)}
          onClick={() => handleClick(card)}
        />
      ))}
    </div>
  );
}