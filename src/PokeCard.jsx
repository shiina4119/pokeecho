import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function PokeCard({ data }) {
    return (
	<Card sx={{ width: 200 }}>
	    <CardMedia
		component="img"
		height="200"
		image={data.sprites.other.dream_world.front_default}
		title={data.name}
	    />
	    <CardContent>
		{data.name}
	    </CardContent>
	</Card>	
    )
}
