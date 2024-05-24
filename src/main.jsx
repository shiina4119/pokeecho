import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import Game from "./routes/Game";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "easy", element: <Game size={5} /> },
  { path: "medium", element: <Game size={10} /> },
  { path: "hard", element: <Game size={15} /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
