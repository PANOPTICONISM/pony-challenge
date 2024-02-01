import classNames from "classnames";
import "./mazerow.styles.css";

const Row = ({ row, disabled }: { row: string[][]; disabled: boolean; }) => {
	const createMaze = (cell: string[] | null, index: number) => {
		const includeMovingElement = () => {
			if (cell?.includes("pony")) {
				return (<img key={index} src="src/assets/applejack.png" className="element" alt="pony" />);
			}
			if (cell?.includes("exit")) {
				return (<img key={index} src="src/assets/portal.png" className="element" alt="exit" />);
			}
			if (cell?.includes("domokun")) {
				return (<img key={index} src="src/assets/domokun.png" className="element" alt="domokun" />);
			}
		};

		return <div
			key={index}
			className={classNames({
				walls: true,
				north: cell?.includes("north"),
				south: cell?.includes("south"),
				east: cell?.includes("east"),
				west: cell?.includes("west"),
			})}
		>
			{includeMovingElement()}
		</div>;
	};

	return (
		<div style={{ display: "flex", background: disabled ? "rgba(0,0,0,0.2)" : "inherit" }}>
			{
				row.map((cell, colIndex) => (
					createMaze(cell, colIndex)
				))
			}
		</div>
	);
};

export default Row;