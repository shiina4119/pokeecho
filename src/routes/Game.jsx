import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import "../styles/Game.css";
import { createRandomArray } from "../utilities";

export default function Game({ size }) {
    const [idList, setIdList] = useState(createRandomArray(size));

    const [allPokemonData, setAllPokemonData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [clickedIdList, setClickedIdList] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
	const promises = idList.map((id) =>
	    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	);

	Promise.all(promises)
	    .then((responses) => Promise.all(responses.map((res) => res.json())))
	    .then((data) => {
		setAllPokemonData(data);
	    })
	    .catch((err) => {
		setError(err);
		console.log(error);
	    })
	    .finally(() => {
		setLoading(false);
	    });
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
		setAllPokemonData((prevPokemonData) =>
		    [...prevPokemonData].sort(() => Math.random() - 0.5)
		);
	    }
	} else {
	    console.log("try harder");
	}
    }

    function handleNewGameButton() {
	setScore(0);
	setGameOver(false);
	setIdList(createRandomArray(size));
	setClickedIdList([]);
    }
    return (
	<>
	    <div id="header">
		<img src="/pokemon.svg" />
		<div className="component typography">
		    <p>Score: {score}</p>
		    <p>High Score: {highScore}</p>
		</div>
	    </div>
	    {loading === false ?
	     <>
		 <div className="container">
		     {allPokemonData.map((pokemonData) => (
			 <button
			     key={pokemonData.id}
			     className="component btn"
			     onClick={() => {
				 handleCardClick(pokemonData.id);
			     }}
			     style={{ backgroundColor: "#D8BFD8" }}
			 >
			     <PokeCard data={pokemonData} />
			 </button>
		     ))}
		 </div>
		 <div className="container">
		     <Link to="/">
			 <button
		     	     className="component btn typography"
			 >
			     Main Menu
			 </button>
		     </Link>
		     <button
			 onClick={() => handleNewGameButton()}
			 className="component btn typography"
		     >
			 New Game
		     </button>
		 </div>
	     </>
	     :
	     <div className="container">
		 <h1 className=" typography">LOADING</h1>
	     </div>}		 
	</>
    );
}
