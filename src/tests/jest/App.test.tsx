import "@testing-library/jest-dom";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import { GameSettingsProvider } from "../../contexts/GameSettingsProvider";
import { getMaze, postMaze } from "../../api/maze";
import { getMazeDummyResponse } from "./dummyData";

jest.mock("../../api/maze", () => ({
	postMaze: jest.fn(() => Promise.resolve({ maze_id: "testMazeId" })),
	getMaze: jest.fn(() => Promise.resolve(getMazeDummyResponse)),
}));

describe("<App /> component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("checks if start screen renders", async () => {
		const { container } = render(
			<GameSettingsProvider>
				<App />
			</GameSettingsProvider>);

		expect(container.querySelector(".settings-icon")).toBeInTheDocument();
		expect(container.querySelector(".introduction")).toBeInTheDocument();
	});
	test("starts game and renders maze after successful API requests", async () => {
		render(
			<GameSettingsProvider>
				<App />
			</GameSettingsProvider>);

		const startButton = screen.getByText("Start game");
		fireEvent.click(startButton);

		await waitFor(() => {
			expect(postMaze).toHaveBeenCalled();
			expect(getMaze).toHaveBeenCalled();
		});

		const titleElement = screen.getByText("Save the pony!");
		expect(titleElement).toBeInTheDocument();

		const mazeWrapper = await screen.findByRole("main");
		expect(mazeWrapper).toBeInTheDocument();

		expect(startButton).not.toBeInTheDocument();
	});
});