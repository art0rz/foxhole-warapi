import { combineDynamicWithStaticData, findNearestTextItem, getMapFlags, MapFlags } from './war-api';

describe('findNearestTextItem', () => {
	it('should find the nearest item', () => {
		expect(
			findNearestTextItem(
				{
					x: 1,
					y: 1,
					teamId: 'NONE',
					flags: 0,
					iconType: 1,
				},
				[
					{
						x: 1.1,
						y: 1.1,
						text: 'Text 1',
						mapMarkerType: 'Major',
					},
					{
						x: 2.1,
						y: 2.1,
						text: 'Text 2',
						mapMarkerType: 'Major',
					},
				]
			).text
		).toEqual('Text 1');
		expect(
			findNearestTextItem(
				{
					x: 2,
					y: 2,
					teamId: 'NONE',
					flags: 0,
					iconType: 1,
				},
				[
					{
						x: 1.1,
						y: 1.1,
						text: 'Text 1',
						mapMarkerType: 'Major',
					},
					{
						x: 2.1,
						y: 2.1,
						text: 'Text 2',
						mapMarkerType: 'Major',
					},
				]
			).text
		).toEqual('Text 2');
	});
});

describe('combineDynamicWithStaticData', () => {
	it('should combine mapItems with mapTextItems correctly', () => {
		const res = combineDynamicWithStaticData(
			[
				{
					x: 1,
					y: 1,
					teamId: 'NONE',
					flags: 0,
					iconType: 1,
				},
				{
					x: 2,
					y: 2,
					teamId: 'NONE',
					flags: 0,
					iconType: 1,
				},
			],
			[
				{
					x: 1.1,
					y: 1.1,
					text: 'Text 1',
					mapMarkerType: 'Major',
				},
				{
					x: 2.1,
					y: 2.1,
					text: 'Text 2',
					mapMarkerType: 'Major',
				},
			]
		);
		expect(res[0].mapTextItem.text).toEqual('Text 1');
		expect(res[1].mapTextItem.text).toEqual('Text 2');
	});
});

describe('getMapFlags', () => {
	it('should get the right map flags', () => {
		expect(getMapFlags(41)).toEqual([MapFlags.IsVictoryBase, MapFlags.IsTownClaimed]);
		expect(getMapFlags(55)).toEqual([
			MapFlags.IsVictoryBase,
			MapFlags.IsHomeBase,
			MapFlags.IsBuildSite,
			MapFlags.IsScorched,
			MapFlags.IsTownClaimed,
		]);
		expect(getMapFlags(52)).toEqual([MapFlags.IsBuildSite, MapFlags.IsScorched, MapFlags.IsTownClaimed]);
	});
});
