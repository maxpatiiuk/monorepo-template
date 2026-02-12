//#region clamp
/**
 * Clamps a value between a minimum and maximum value.
 *
 * @param value The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 *
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  //#endregion clam
  return Math.max(min, Math.min(max, value));
}

//#region lerp
/**
 * Linearly interpolates between two numbers.
 *
 * @param min - The start value.
 * @param max - The end value.
 * @param t - The interpolation factor, typically between 0 and 1.
 * @returns The interpolated value between `min` and `max` based on `t`.
 */
export function lerp(min: number, max: number, t: number): number {
  //#endregion lerp
  return min + (max - min) * t;
}
