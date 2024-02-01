import { keyAsDirection } from "../../utils/keyboard";

describe("keyAsDirection", () => {
	test("should return the correct direction for a valid key", () => {
		expect(keyAsDirection["ArrowUp"]).toBe("north");
		expect(keyAsDirection["ArrowDown"]).toBe("south");
		expect(keyAsDirection["ArrowLeft"]).toBe("west");
		expect(keyAsDirection["ArrowRight"]).toBe("east");
	});

	test("should return undefined for an invalid key", () => {
		expect(keyAsDirection["Arrow"]).toBeUndefined();
	});
});
