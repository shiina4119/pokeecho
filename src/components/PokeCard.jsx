import "../styles/PokeCard.css";

export default function PokeCard({ pokemon }) {
  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="typography">{pokemon.name}</div>
    </div>
  );
}
