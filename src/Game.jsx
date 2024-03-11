import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";

export default function Game() {
    const [ pokemonData, setPokemonData ] = useState({});
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    async function getPokemonData(id) {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	fetch(url)
	    .then(res => {
                if(res.status >= 400)
                    throw new Error('server error');
                return res.json();
            })
            .then(data => { setPokemonData(data) })
            .catch(error => { setError(error) })
            .finally(() => { setLoading(false) });
    };
    
    useEffect(() => {
	getPokemonData(25);
	if(!error) {
	    console.log(pokemonData);
	} else {
	    console.log(error);
	}
    }, []);
    
    return (
	<>
	    {loading ? <h1>loading</h1> : <PokeCard data={pokemonData} />}
	</>
    );
}
