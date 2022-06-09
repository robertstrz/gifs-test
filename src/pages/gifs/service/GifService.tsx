import * as React from "react";
import { FC, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";

export const gf = new GiphyFetch(process.env.REACT_APP_API_KEY as string);

const animalsType: ReadonlyArray<string> = [
	"cats",
	"dogs",
	"elephants",
	"lions",
	"monkeys",
];

export interface GifsInterface {
	getGifs: () => Promise<IGif[]>;
}

const useGifService = () => {
	const [gifs, setGifs] = useState<IGif[] | null>(null);
	useEffect(() => {
		gifsService.getGifs().then((response) => {
			setGifs(response);
		});
	}, []);

	const gifsService: GifsInterface = {
		getGifs(): Promise<IGif[]> {
			const gifPromises = animalsType.map((animalName) => {
				return gf.search(animalName, { limit: 10 });
			});
			return Promise.allSettled(gifPromises).then((results) => {
				return results.reduce((gifs, currentGifsResponse) => {
					if (currentGifsResponse.status === "fulfilled") {
						gifs.push(...currentGifsResponse.value.data);
					}
                    console.log(123);
                    return gifs;
				}, [] as Array<IGif>);
			});
		},
	};

	return gifs;
};
export const GifServiceContext = React.createContext<IGif[] | null>([]);

export interface Children {
	children: React.ReactNode;
}

export const GifServiceProvider: FC<Children> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<GifServiceContext.Provider value={useGifService()}>
			{children}
		</GifServiceContext.Provider>
	);
};
