
import { getMazeDummyResponse } from "./dummyData";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MazeWrapper from "../../components/MazeWrapper/MazeWrapper";
import { getMaze, postNextMoveInMaze } from "../../api/maze";
import { GameSettingsProvider } from "../../contexts/GameSettingsProvider";

jest.mock("../../api/maze", () => ({
	getMaze: jest.fn(() => Promise.resolve(getMazeDummyResponse)),
	postNextMoveInMaze: jest.fn(() => Promise.resolve({ direction: "north" })),
}));

jest.mock("react-toastify", () => ({
	ToastContainer: jest.fn(() => null),
	toast: {
		success: jest.fn(),
		warning: jest.fn(),
		error: jest.fn(),
	},
}));

const createNewGame = jest.fn();
const generateMaze = jest.fn();

describe("<MazeWrapper /> component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("key up event functional for game moves when a game has started", async () => {
		render(
			<GameSettingsProvider>
				<MazeWrapper
					createNewGame={createNewGame}
					generateMaze={generateMaze}
					mazeId='testMazeId'
					maze={Array(15).fill(Array(15).fill([]))} />
			</GameSettingsProvider>);

		const startButton = screen.getByRole('button', { name: 'Start game' });
		fireEvent.click(startButton);

		fireEvent.keyDown(document, { key: "ArrowUp" });

		await waitFor(() => {
			expect(postNextMoveInMaze).toHaveBeenCalled();
			expect(getMaze).toHaveBeenCalled();
		});
	});

	test("key up event does not work when game has not started", async () => {
		render(
			<GameSettingsProvider>
				<MazeWrapper
					createNewGame={createNewGame}
					generateMaze={generateMaze}
					mazeId='testMazeId'
					maze={Array(15).fill(Array(15).fill([]))} />
			</GameSettingsProvider>);

		fireEvent.keyDown(document, { key: "ArrowUp" });

		await waitFor(() => {
			expect(postNextMoveInMaze).not.toHaveBeenCalled();
			expect(getMaze).not.toHaveBeenCalled();
		});

	});
});