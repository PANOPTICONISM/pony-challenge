import { MazeDetailsProps } from "../../api/maze";

export const getMazeDummyResponse = {
	data: Array(256).fill([[]]),
	difficulty: 1,
	domokun: [221],
	maze_id: "testMazeId",
	pony: [71],
	size: [16, 16],
	"end-point": [218],
	"game-state": {
		state: "Active",
		"state-result": "Move accepted"
	}
} as MazeDetailsProps;