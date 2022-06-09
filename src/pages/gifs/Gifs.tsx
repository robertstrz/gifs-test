import React, { useContext, useEffect, useState } from "react";
import { Gif } from "@giphy/react-components";
import { GifServiceContext } from "./service/GifService";
import { IGif } from "@giphy/js-types";

export const Gifs = () => {
	const [currentGif, setCurrentGif] = useState<IGif | null>(null);
	const gifs = useContext<IGif[] | null>(GifServiceContext);

	useEffect(() => {
		changeGif();
	}, [gifs]);

	const changeGif = () => {
		gifs && setCurrentGif(gifs[Math.floor(Math.random() * gifs.length)]);
	};

	return (
		currentGif && (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<Gif gif={currentGif} width={300} />
				<button style={{ width: "100px", marginTop: '50px' }} onClick={changeGif}>
					CHANGE GIF
				</button>
			</div>
		)
	);
};
