import "./PokeCard.css";

export default function PokeCard({ data }) {
    return (
	<div className="card">
	    <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
	    <div className="card-details">
		{data.name}
	    </div>
	</div>
    )
}
