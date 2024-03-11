import { Card } from "react-bootstrap";

export default function PokeCard({ data }) {
    return (
	<Card>
	    <Card.Img variant="top" src={data.sprites.front_default} />
	    <Card.Body>
		<Card.Title>{data.name}</Card.Title>
	    </Card.Body>
	</Card>
    )
}
