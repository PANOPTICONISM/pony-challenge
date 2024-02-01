import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Row from "../../components/MazeRow/MazeRow";

describe("<Row /> component", () => {
	test("renders a pony cell", () => {
		const row = [["pony"]];
		render(<Row row={row} disabled={false} />);
		expect(screen.getByAltText("pony")).toBeInTheDocument();
	});

	test("renders an exit cell", () => {
		const row = [["exit"]];
		render(<Row row={row} disabled={false} />);
		expect(screen.getByAltText("exit")).toBeInTheDocument();
	});

	test("renders a domokun cell", () => {
		const row = [["domokun"]];
		render(<Row row={row} disabled={false} />);
		expect(screen.getByAltText("domokun")).toBeInTheDocument();
	});

	test("renders multiple cell types", () => {
		const row = [["north", "west", "exit"]];
		const { container } = render(<Row row={row} disabled={false} />);
		expect(container.querySelector(".walls")).toBeInTheDocument();
		expect(screen.getByAltText("exit")).toBeInTheDocument();
	});

	test("renders row parent with overlay background when disabled", () => {
		const row = [["north"]];
		const { container } = render(<Row row={row} disabled={true} />);
		expect(container.querySelector(".walls")?.parentElement).toHaveStyle("background: rgba(0,0,0,0.2)");
	});

	test("renders row parent without overlay background when not disabled", () => {
		const row = [["north"]];
		const { container } = render(<Row row={row} disabled={false} />);
		expect(container.querySelector(".walls")?.parentElement).toHaveStyle("background: inherit");
	});
});
