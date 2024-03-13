import { useState } from "react";
import Game from "./Game";
import "./App.css";

export default function App() {
    const [ size, setSize ] = useState(15);
    return <Game size={size} />
}
