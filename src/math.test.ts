import { distanceBetweenPoints } from './math';

describe('distanceBetweenPoints', () => {
	it('should calculate the distance between two points correctly', () => {
		expect(
			distanceBetweenPoints(
				{
					x: 0,
					y: 0,
				},
				{
					x: 1,
					y: 0,
				}
			)
		).toEqual(1);
		expect(
			distanceBetweenPoints(
				{
					x: 0,
					y: 0,
				},
				{
					x: 0,
					y: 1,
				}
			)
		).toEqual(1);
	});
});
