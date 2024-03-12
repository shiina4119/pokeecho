import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import "./Game.css";
import { createRandomArray } from "./utilities";

export default function Game({ size }) {
    const [ idList, setIdList ] = useState(createRandomArray(size));
    
    const [ allPokemonData, setAllPokemonData ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const [ clickedIdList, setClickedIdList] = useState([]);
    const [ gameOver, setGameOver ] = useState(false);
    const [ score, setScore ] = useState(0);
    const [ highScore, setHighScore ] = useState(0);
    
    useEffect(() => {
	const promises = idList.map(id =>
	    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
	
	Promise.all(promises)
	    .then(responses =>
		Promise.all(responses.map(res =>
		    res.json())))
	    .then(data => { setAllPokemonData(data); })
	    .catch(err => {
		setError(err);
		console.log(error);
	    })
	    .finally(() => { setLoading(false); });
    }, [idList]);

    function handleCardClick(id) {
	if (!gameOver) {
	    if (clickedIdList.includes(id)) {
		console.log("game over");
		setGameOver(true);
		if (score > highScore) {
		    setHighScore(score);
		}
		setScore(0);
		setClickedIdList([]);
	    } else {
		setClickedIdList([...clickedIdList, id]);
		setScore(score + 1);
		setAllPokemonData((prevPokemonData) => [...prevPokemonData].sort(() => Math.random() - 0.5));
	    }
	} else {
	    console.log("try harder");
	}
    };

    function handleNewGameButton() {
	setScore(0);
	setGameOver(false);
	setIdList(createRandomArray(size));
	setClickedIdList([]);
    }

    if(loading) {
	return <h1>loading</h1>;
    }
    else {
	return (
	    <>
		<div>
		    <p>Score: {score}</p>
		    <p>High Score: {highScore}</p>
		</div>
		<div className="container">
		    {allPokemonData.map(pokemonData =>
			<button key={pokemonData.id} className="card-button" onClick={() => { handleCardClick(pokemonData.id) }}>
			    <PokeCard data={pokemonData} />
			</button>
		    )}
		</div>
		<div>
		    <p>
			<button onClick={() => handleNewGameButton()}>New Game</button>
		    </p>
		</div>
	    </>
	);
    }
}
