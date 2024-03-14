import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import "../styles/Game.css";
import { createRandomArray, shuffleArray } from "../utilities";

export default function Game({ size }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [idList, setIdList] = useState(createRandomArray(size));
    const [clickedIdList, setClickedIdList] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
	const promises = idList.map((id) =>
	    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	);

	Promise.all(promises)
	    .then((responses) => Promise.all(responses.map((res) =>
		res.json())))
	    .then((list) => {
		setPokemonList(list);
	    })
	    .catch((err) => {
		setError(err);
		console.log(error);
	    })
	    .finally(() => {
		setLoading(false);
	    });
	return (() => {
	    setPokemonList([]);
	    setError(null);
	    setLoading(false);
	})
    }, [idList]);

    function handleCardClick(id) {
	if (clickedIdList.includes(id)) {
	    setGameOver(true);
	    if (score > highScore) {
		setHighScore(score);
	    }
	}
	else {
	    setClickedIdList([...clickedIdList, id]);
	    setScore(score + 1);
	    if (score + 1 === size) {
		setHighScore(size);
		setGameOver(true);
	    }
	    else {
		setPokemonList((prevPokemonList) =>
		    shuffleArray(prevPokemonList)
		);
	    }
	}
    }

    function handleNewGameButton() {
	setScore(0);
	setGameOver(false);
	setIdList(createRandomArray(size));
	setClickedIdList([]);
    }

    if (gameOver === true) return (
	<div className="component banner">
	    {score === size ?
	     <>
		 <div className="typography"
		      style={{ fontSize: "24px" }}>
		     You Won!
		 </div>
		 <img src="/cat-flower.jpeg" />
	     </>
	     :
	     <>
		 <div className="typography"
		      style={{ fontSize: "24px" }}>
		     Game Over
		 </div>
		 <img src="/laugh-point.gif" />
	     </>
	    }
	    <div className="typography">
		<p>Score: {score}</p>
		<p>High Score: {highScore}</p>
	    </div>
	    <div className="container">
		<button
		    onClick={() => handleNewGameButton()}
		    className="component btn typography"
		>
		    New Game
		</button>
		<Link to="/">
		    <button className="component btn typography">
			Main Menu
		    </button>
		</Link>
	    </div>
	</div>
    )
    else return (
	<>
	    {loading === false ?
	     <>
		 <div id="header">
		     <Link to="/">
			 <img src="/pokemon.svg" />
		     </Link>
		     <div className="component typography">
			 <p>Score: {score}</p>
			 <p>High Score: {highScore}</p>
		     </div>
		 </div>
		 <div className="container">
		     {pokemonList.map((pokemonData) => (
			 <button
			     key={pokemonData.id}
			     className="component btn"
			     onClick={() => {
				 handleCardClick(pokemonData.id);
			     }}
			     style={{ backgroundColor: "#D8BFD8" }}
			 >
			     <PokeCard pokemon={pokemonData} />
			 </button>
		     ))}
		 </div>
	     </>
	     :
	     <div className="container">
		 <h1 className=" typography">LOADING</h1>
	     </div>
	    }		 
	</>
    );
}
 
