import "./PokeCard.css";

export default function PokeCard({ data }) {
    return (
	<div className="card">
	    <img src={data.sprites.front_default} alt={data.name} />
	    <div className="card-details typography">{data.name}</div>
	</div>
    );
}
