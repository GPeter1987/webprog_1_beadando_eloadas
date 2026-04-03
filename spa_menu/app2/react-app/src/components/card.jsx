export default function Card({ card, flipped, matched, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {(flipped || matched) ?
        <img src={card.img} /> :
        <span style={{fontSize:"30px"}}>?</span>
      }
    </div>
  );
}