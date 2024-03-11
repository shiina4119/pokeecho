import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import { Grid, CircularProgress, styled, Paper } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Game({ size }) {  
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    const idList = Array.from({
	length: size
    }, () => Math.floor(Math.random() * 600));
    
    useEffect(() => {
	console.log("promise effect running");
	const promises = idList.map(id =>
	    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
	
	Promise.all(promises)
	    .then(responses =>
		Promise.all(responses.map(res =>
		    res.json())))
	    .then(data => { setPokemonList(data) })
	    .catch(err => { setError(err) })
	    .finally(() => { setLoading(false) });
    }, []);

    if(loading) {
	return <CircularProgress />;
    }
    else {
	return (
	    <>
	    </>
	);
    }
}
