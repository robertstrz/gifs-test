import React from "react";
import "./App.css";
import { Gifs } from "./pages/gifs/Gifs";
import { GifServiceProvider } from "./pages/gifs/service/GifService";

export const App = () => (
	<div className="App">
		<GifServiceProvider>
			<Gifs />
		</GifServiceProvider>
	</div>
);
