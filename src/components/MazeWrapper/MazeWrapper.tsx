import { useCallback, useEffect } from "react";
import { keyAsDirection } from "../../utils/keyboard";
import { MazeDetailsProps, getMaze, postNextMoveInMaze } from "../../api/maze";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGameStatus } from "../../contexts/GameSettingsProvider";
import "./MazeWrapper.styles.css";
import Row from "../MazeRow/MazeRow";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import StartScreen from "../StartScreen/StartScreen";
import StartButton from "../StartButton/StartButton";

const MazeWrapper = ({
	createNewGame,
	generateMaze,
	mazeId,
	maze
}: {
	createNewGame: () => void;
	generateMaze: (mazeDetails: MazeDetailsProps) => void;
	mazeId: string | undefined;
	maze: Array<string[][]> | undefined
}) => {
	const [hasGameStarted, setHasGameStarted, hasGameFinished, setHasGameFinished] = useGameStatus();

	const handleKeyUp = useCallback((e: KeyboardEvent) => {
		if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
			e.preventDefault();
		}
		if (!keyAsDirection[e.key] || !mazeId) {
			return;
		}
		const gameFinished = () => {
			setHasGameFinished(true);
			setHasGameStarted(false);
		}
		postNextMoveInMaze(keyAsDirection[e.key], mazeId)
			.then(() => getMaze(mazeId).then((res) => {
				generateMaze(res);
				if (res["game-state"].state === "won") {
					gameFinished();
					return toast.success("You have saved AppleJack. Congrats!");
				}
				if (res["game-state"].state === "over") {
					gameFinished();
					return toast.error("You lost. AppleJack has been caught by the monster. ");
				}
				if (res["game-state"]["state-result"] === "Can't walk in there") {
					return toast.warning("AppleJack can't move through walls (yet).");
				}
			}));
	}, [generateMaze, mazeId, setHasGameFinished, setHasGameStarted]);

	useEffect(() => {
		if (hasGameStarted) {
			document.addEventListener("keydown", handleKeyUp);

			return () => {
				document.removeEventListener("keydown", handleKeyUp);
			};
		}
	}, [handleKeyUp, hasGameStarted]);

	if (!hasGameStarted && !hasGameFinished) {
		return (
			<StartScreen createNewGame={createNewGame} />
		)
	}

	return (maze === undefined ?
		<LoadingIcon /> :
		<div className="wrapper">
			<header>
				<h1>Save the pony!</h1>
			</header>
			<main>
				{hasGameFinished && !hasGameStarted ?
					<div className="button-wrapper">
						<StartButton text="Play again" createNewGame={createNewGame} />
					</div> : null}
				{maze.map((row, index) => <Row key={index} row={row} disabled={!hasGameStarted} />)}
			</main>
		</div>
	);
};

export default MazeWrapper;