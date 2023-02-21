// Define the Point type
export type Point = { x: number; y: number };

/**
 * Calculates the distance between two points using the Pythagorean theorem.
 */
export function distanceBetweenPoints<P1 extends Point, P2 extends Point>(p1: P1, p2: P2): number {
	const deltaX = p2.x - p1.x;
	const deltaY = p2.y - p1.y;
	const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
	return distance;
}
