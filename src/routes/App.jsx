import { Link } from "react-router-dom";
import "../styles/App.css";

export default function App() {
	let difficulty = ["easy", "medium", "hard"];
	return (
		<>
			<div className="container">
				<img src="/pokemon.svg" />
			</div>
			<div className="container">
				{difficulty.map(d =>
					<Link key={d} to={d}>
						<button className="component btn typography">
							{d.toUpperCase()}
						</button>
					</Link>
				)}
			</div>
		</>
	)
}
