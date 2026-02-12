import { describe, it, expect } from "vitest";
import { clamp, lerp } from "./index.js";

describe(clamp, () => {
  it("value within the range", () => expect(clamp(5, 1, 10)).toBe(5));
  it("value below the min", () => expect(clamp(-5, 1, 10)).toBe(1));
  it("value above the max", () => expect(clamp(15, 1, 10)).toBe(10));
});

describe(lerp, () => {
  it("0", () => expect(lerp(0, 10, 0)).toBe(0));
  it("0.5", () => expect(lerp(0, 10, 0.5)).toBe(5));
  it("1", () => expect(lerp(0, 10, 1)).toBe(10));
});
