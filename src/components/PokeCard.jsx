import "../styles/PokeCard.css";

export default function PokeCard({ data }) {
    return (
	<div className="card">
	    <img src={data.sprites.front_default} alt={data.name} />
	    <div className="typography">{data.name}</div>
	</div>
    );
}
