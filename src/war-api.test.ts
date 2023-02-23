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
						teamId: 'NONE',
						iconType: 56,
						x: 0.5124967,
						y: 0.51357573,
						flags: 1,
					},
					mapTextItem: {
						text: 'Buckler Sound',
						x: 0.51059383,
						y: 0.5146678,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'WARDENS',
						iconType: 56,
						x: 0.5124967,
						y: 0.51357573,
						flags: 5,
					},
					mapTextItem: {
						text: 'Buckler Sound',
						x: 0.51059383,
						y: 0.5146678,
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
						iconType: 56,
						x: 0.5124967,
						y: 0.51357573,
						flags: 5,
					},
					mapTextItem: {
						text: 'Buckler Sound',
						x: 0.51059383,
						y: 0.5146678,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'WARDENS',
						iconType: 56,
						x: 0.5124967,
						y: 0.51357573,
						flags: 9,
					},
					mapTextItem: {
						text: 'Buckler Sound',
						x: 0.51059383,
						y: 0.5146678,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.Won,
			byTeam: 'WARDENS',
		});

		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'NONE',
						iconType: 28,
						x: 0.6182004,
						y: 0.78928536,
						flags: 0,
					},
					mapTextItem: {
						text: 'Integrum',
						x: 0.6686882,
						y: 0.773776,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 28,
						x: 0.6182004,
						y: 0.78928536,
						flags: 0,
					},
					mapTextItem: {
						text: 'Integrum',
						x: 0.6686882,
						y: 0.773776,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.Won,
			byTeam: 'COLONIALS',
		});

		expect(
			determineEventStatusType({
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
			})
		).toEqual({
			event: EventType.Lost,
			byTeam: 'WARDENS',
		});

		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 56,
						x: 0.70331603,
						y: 0.38726288,
						flags: 4,
					},
					mapTextItem: {
						text: 'Ice Ranch',
						x: 0.70420206,
						y: 0.3878927,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'NONE',
						iconType: 56,
						x: 0.70331603,
						y: 0.38726288,
						flags: 0,
					},
					mapTextItem: {
						text: 'Ice Ranch',
						x: 0.70420206,
						y: 0.3878927,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.ConstructionCancelled,
			byTeam: 'COLONIALS',
		});

		expect(
			determineEventStatusType({
				old: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 56,
						x: 0.41615328,
						y: 0.70517087,
						flags: 8,
					},
					mapTextItem: {
						text: 'The First Coin',
						x: 0.40840903,
						y: 0.7184508,
						mapMarkerType: 'Major',
					},
				},
				new: {
					mapItem: {
						teamId: 'COLONIALS',
						iconType: 57,
						x: 0.41615328,
						y: 0.70517087,
						flags: 4,
					},
					mapTextItem: {
						text: 'The First Coin',
						x: 0.40840903,
						y: 0.7184508,
						mapMarkerType: 'Major',
					},
				},
			})
		).toEqual({
			event: EventType.Upgrading,
			byTeam: 'COLONIALS',
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
