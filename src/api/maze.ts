import { AxiosError } from "axios";
import { requester } from "./axios";

type ServerError = { message: string };

type MazeCreationProps = { maze_id: string };

type CreateMazeProps = {
	"maze-width": number,
	"maze-height": number,
	"maze-player-name": string,
	"difficulty": number
};

export const postMaze = async (body: CreateMazeProps): Promise<MazeCreationProps> => {
	const path = "/pony-challenge/maze";

	try {
		const response = await requester.post(path, body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data as MazeCreationProps;
	} catch (err) {
		const error = err as AxiosError<ServerError>;
		throw new Error(error.response?.data?.message || error.message);
	}
};

export type MazeDetailsProps = {
    data: ("north" | "west")[][];
    difficulty: number;
    domokun: number[];
    "end-point": number[];
    "game-state": {
        state: "Active" | "won" | "over";
        "state-result": "Successfully created" | "Can't walk in there" | "Move accepted" | "You won. Game ended";
    };
    maze_id: string;
    pony: number[];
    size: number[];
}

export const getMaze = async (mazeId: string): Promise<MazeDetailsProps> => {
	const path = `/pony-challenge/maze/${mazeId}`;

	try {
		const response = await requester.get(path, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data as MazeDetailsProps;
	} catch (err) {
		const error = err as AxiosError<ServerError>;
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const postNextMoveInMaze = async (
	direction: "north" | "south" | "west" | "east",
	mazeId: string
) => {
	const path = `/pony-challenge/maze/${mazeId}`;

	try {
		const response = await requester.post(path, { direction }, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data as string;
	} catch (err) {
		const error = err as AxiosError<ServerError>;
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const getVisualStateOfMaze = async (mazeId: string) => {
	const path = `/pony-challenge/maze/${mazeId}/print`;

	try {
		const response = await requester.get(path, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (err) {
		const error = err as AxiosError<ServerError>;
		throw new Error(error.response?.data?.message || error.message);
	}
};