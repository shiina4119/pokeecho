import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import { Grid, CircularProgress, styled, Paper } from "@mui/material";
import "./Game.css";

export default function Game({ size }) {  
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    const idList = Array.from({
	length: size
    }, () => Math.floor(Math.random() * 600) + 1);
    
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

    function handleClick() {
	console.log("clicked");
	setPokemonList((prevPokemonList) => [...prevPokemonList].sort(() => Math.random() - 0.5));
    };

    if(loading) {
	return <CircularProgress />;
    }
    else {
	return (
	    <>
		<div className="container">
		    {pokemonList.map(pokemonData =>
			<button key={pokemonData.id} className="card-button" onClick={() => { handleClick() }}>
			    <PokeCard data={pokemonData} />
			</button>
		    )}
		</div>
	    </>
	);
    }
}
