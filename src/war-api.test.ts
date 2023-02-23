import {
	combineDynamicWithStaticData,
	determineEventStatusType,
	diffCombinedMapData,
	findNearestTextItem,
	getMapFlags,
} from './war-api';
import { EventType, MapFlags } from './types';

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

describe('determineEventStatusType', () => {
	it('should return the correct event type and teamId', () => {
		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 56,
						x: 0.8525794,
						y: 0.5295663,
						flags: 4,
					},
					mapTextItem: {
						text: 'Tuatha Watchpost',
						x: 0.853922,
						y: 0.5507405,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 57,
						x: 0.8525794,
						y: 0.5295663,
						flags: 8,
					},
					mapTextItem: {
						text: 'Tuatha Watchpost',
						x: 0.853922,
						y: 0.5507405,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.Upgraded,
			byTeam: 'COLONIALS',
		});
		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 45,
						x: 0.6523639,
						y: 0.7225221,
						flags: 8,
					},
					mapTextItem: {
						text: 'Spirit Watch',
						x: 0.6523898,
						y: 0.7255189,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'NONE',
						iconType: 45,
						x: 0.6523639,
						y: 0.7225221,
						flags: 0,
					},
					mapTextItem: {
						text: 'Spirit Watch',
						x: 0.6523898,
						y: 0.7255189,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.Lost,
			byTeam: 'COLONIALS',
		});

		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 28,
						x: 0.841185,
						y: 0.52723134,
						flags: 0,
					},
					mapTextItem: {
						text: 'Mousetrap',
						x: 0.8401006,
						y: 0.53316337,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'NONE',
						iconType: 28,
						x: 0.841185,
						y: 0.52723134,
						flags: 0,
					},
					mapTextItem: {
						text: 'Mousetrap',
						x: 0.8401006,
						y: 0.53316337,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.Lost,
			byTeam: 'COLONIALS',
		});

		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 56,
						x: 0.8392175,
						y: 0.54724175,
						flags: 8,
					},
					mapTextItem: {
						text: 'Mousetrap',
						x: 0.8401006,
						y: 0.53316337,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'NONE',
						iconType: 56,
						x: 0.8392175,
						y: 0.54724175,
						flags: 0,
					},
					mapTextItem: {
						text: 'Mousetrap',
						x: 0.8401006,
						y: 0.53316337,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.Lost,
			byTeam: 'COLONIALS',
		});

		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'NONE',
						iconType: 40,
						x: 0.11745039,
						y: 0.473913,
						flags: 0,
					},
					mapTextItem: {
						text: 'Hungry Wolf',
						x: 0.17645623,
						y: 0.46003953,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'WARDENS',
						iconType: 40,
						x: 0.11745039,
						y: 0.473913,
						flags: 4,
					},
					mapTextItem: {
						text: 'Hungry Wolf',
						x: 0.17645623,
						y: 0.46003953,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.UnderConstruction,
			byTeam: 'WARDENS',
		});

		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'WARDENS',
						iconType: 40,
						x: 0.11745039,
						y: 0.473913,
						flags: 4,
					},
					mapTextItem: {
						text: 'Hungry Wolf',
						x: 0.17645623,
						y: 0.46003953,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'NONE',
						iconType: 40,
						x: 0.11745039,
						y: 0.473913,
						flags: 0,
					},
					mapTextItem: {
						text: 'Hungry Wolf',
						x: 0.17645623,
						y: 0.46003953,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.ConstructionCancelled,
			byTeam: 'WARDENS',
		});
	});
});

describe('diffCombinedMapData', () => {
	it('should diff combine map data correctly', () => {
		expect(
			diffCombinedMapData(
				[
					{
						mapItem: {
							teamId: 'WARDENS',
							iconType: 47,
							x: 0.38665664,
							y: 0.30743244,
							flags: 8,
						},
						mapTextItem: {
							text: 'Shattered Advance',
							x: 0.38944197,
							y: 0.30851248,
							mapMarkerType: 'Major',
						},
					},
				],
				[
					{
						mapItem: {
							teamId: 'NONE',
							iconType: 47,
							x: 0.38665664,
							y: 0.30743244,
							flags: 0,
						},
						mapTextItem: {
							text: 'Shattered Advance',
							x: 0.38944197,
							y: 0.30851248,
							mapMarkerType: 'Major',
						},
					},
				]
			)
		).toEqual([
			{
				old: {
					mapItem: {
						teamId: 'WARDENS',
						iconType: 47,
						x: 0.38665664,
						y: 0.30743244,
						flags: 8,
					},
					mapTextItem: {
						text: 'Shattered Advance',
						x: 0.38944197,
						y: 0.30851248,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'NONE',
						iconType: 47,
						x: 0.38665664,
						y: 0.30743244,
						flags: 0,
					},
					mapTextItem: {
						text: 'Shattered Advance',
						x: 0.38944197,
						y: 0.30851248,
						mapMarkerType: 'Major',
					},
				},
			},
		]);
	});
});
