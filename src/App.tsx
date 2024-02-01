import { ToastContainer } from "react-toastify";
import MazeSettings from "./components/MazeSettings/MazeSettings";
import MazeWrapper from "./components/MazeWrapper/MazeWrapper";
import { MazeDetailsProps, getMaze, postMaze } from "./api/maze";
import { useGameSettings } from "./contexts/GameSettingsProvider";
import { useState } from "react";

function App() {
	const [settings] = useGameSettings();

	const [mazeId, setMazeId] = useState<string | undefined>(undefined);
	const [maze, setMaze] = useState<Array<string[][]> | undefined>(undefined);

	const generateMaze = (mazeDetails: MazeDetailsProps) => {
		const dimensionA = mazeDetails.size[0];
		const dimensionB = mazeDetails.size[1];

		const newMazeWalls = Array(dimensionB)
			.fill(null)
			.map(() => Array(dimensionA).fill(null));

		mazeDetails.data.forEach((walls, index) => {
			const rowIndex = Math.floor(index / dimensionA);
			const colIndex = index % dimensionA;

			if (dimensionB === rowIndex + 1 && dimensionA === colIndex + 1) {
				return (newMazeWalls[rowIndex][colIndex] = [...walls, "south", "east"]);
			}
			if (dimensionB === rowIndex + 1) {
				return (newMazeWalls[rowIndex][colIndex] = [...walls, "south"]);
			}
			if (dimensionA === colIndex + 1) {
				return (newMazeWalls[rowIndex][colIndex] = [...walls, "east"]);
			}
			return (newMazeWalls[rowIndex][colIndex] = walls);
		});

		const updateMazeCell = (
			maze: string[][][],
			rowIndex: number,
			colIndex: number,
			value: string
		): void => {
			maze[rowIndex][colIndex] = [...maze[rowIndex][colIndex], value];
		};

		const exitRow = Math.floor(mazeDetails["end-point"][0] / dimensionA);
		const exitCol = mazeDetails["end-point"][0] % dimensionA;

		updateMazeCell(newMazeWalls, exitRow, exitCol, "exit");
		updateMazeCell(newMazeWalls, Math.floor(mazeDetails.pony[0] / dimensionA), mazeDetails.pony[0] % dimensionA, "pony");
		updateMazeCell(newMazeWalls, Math.floor(mazeDetails.domokun[0] / dimensionA), mazeDetails.domokun[0] % dimensionA, "domokun");


		setMaze(newMazeWalls);
	};

	const createNewGame = () => {
		postMaze({
			"maze-width": Number(settings.maxWidth),
			"maze-height": Number(settings.maxHeight),
			"difficulty": Number(settings.difficulty),
			"maze-player-name": "AppleJack"
		}).then((res) => {
			setMazeId(res.maze_id
			);
			getMaze(res.maze_id).then((res) => {
				generateMaze(res);
			});
		});
	};

	return (
		<>
			<MazeSettings createNewGame={createNewGame} />
			<MazeWrapper
				createNewGame={createNewGame}
				generateMaze={generateMaze}
				mazeId={mazeId}
				maze={maze}
			/>
			<ToastContainer
				position="bottom-right"
				autoClose={4000}
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark" />
		</>
	);
}

export default App;
