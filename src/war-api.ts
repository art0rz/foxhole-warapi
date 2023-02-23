import {
	CombinedMapData,
	DiffedMapData,
	Event,
	EventType,
	MapFlags,
	MapIconTypes,
	MapItem,
	MapTextItem,
} from './types';
import { distanceBetweenPoints } from './math';

const mapFlagValues: Record<MapFlags, number> = {
	[MapFlags.IsVictoryBase]: 0x01,
	[MapFlags.IsHomeBase]: 0x02,
	[MapFlags.IsBuildSite]: 0x04,
	[MapFlags.IsScorched]: 0x10,
	[MapFlags.IsTownClaimed]: 0x20,
};

/**
 * Given a MapItem and a list of MapTextItems, finds the nearest MapTextItem. This is useful for determining which town a MapItem belongs to.
 */
export function findNearestTextItem(mapItem: MapItem, mapTextItems: Array<MapTextItem>): MapTextItem {
	const distances = mapTextItems.map(item => distanceBetweenPoints(mapItem, item));
	const closest = [...distances].sort()[0];
	return mapTextItems[distances.indexOf(closest)];
}

/**
 * Matches each MapItem with the closest MapTextItem.
 */
export function combineDynamicWithStaticData(
	mapItems: Array<MapItem>,
	mapTextItems: Array<MapTextItem>
): Array<CombinedMapData> {
	return mapItems
		.map<any>(mapItem => {
			const mapTextItem = findNearestTextItem(mapItem, mapTextItems);
			return {
				mapItem,
				mapTextItem,
			};
		})
		.filter(item => item);
}

/**
 * Returns true if the flags number contains the given MapFlag.
 */
export function hasMapFlag(flags: number, flag: MapFlags): boolean {
	// eslint-disable-next-line no-bitwise
	return (flags & mapFlagValues[flag]) !== 0;
}

/**
 * Returns a list of each MapFlag that the flags contain.
 */
export function getMapFlags(flags: number): Array<MapFlags> {
	// eslint-disable-next-line no-bitwise
	return Object.values(MapFlags).filter(flag => hasMapFlag(flags, flag));
}

/**
 * Returns a list of CombinedMapData where the map flags or team id from the two arguments is different. Assumes that the order of the two lists is the same.
 * @param data1
 * @param data2
 */
export function diffCombinedMapData(
	data1: Array<CombinedMapData>,
	data2: Array<CombinedMapData>
): Array<DiffedMapData> {
	const different = data2.filter((item, index) => {
		return item.mapItem.flags !== data1[index].mapItem.flags || item.mapItem.teamId !== data1[index].mapItem.teamId;
	});

	return different.map(item => ({
		old: data1[data2.indexOf(item)],
		new: item,
	}));
}

export function determineEventStatusType(data: DiffedMapData): Event | undefined {
	const oldFlags = getMapFlags(data.old.mapItem.flags);
	const newFlags = getMapFlags(data.new.mapItem.flags);

	if (
		oldFlags.includes(MapFlags.IsBuildSite) === false &&
		newFlags.includes(MapFlags.IsBuildSite) === true &&
		data.old.mapItem.teamId === 'NONE' &&
		data.new.mapItem.teamId !== 'NONE'
	) {
		return {
			event: EventType.UnderConstruction,
			byTeam: data.new.mapItem.teamId,
		};
	}

	if (
		oldFlags.includes(MapFlags.IsBuildSite) === true &&
		newFlags.includes(MapFlags.IsBuildSite) === false &&
		data.old.mapItem.teamId === data.new.mapItem.teamId &&
		data.old.mapItem.iconType === MapIconTypes.Town_Base_1 &&
		data.new.mapItem.iconType === MapIconTypes.Town_Base_3
	) {
		return {
			event: EventType.Upgraded,
			byTeam: data.new.mapItem.teamId,
		};
	}

	if (
		oldFlags.includes(MapFlags.IsBuildSite) === false &&
		newFlags.includes(MapFlags.IsBuildSite) === false &&
		data.old.mapItem.teamId === 'NONE' &&
		data.new.mapItem.teamId !== 'NONE'
	) {
		return {
			event: EventType.Won,
			byTeam: data.new.mapItem.teamId,
		};
	}

	if (
		oldFlags.includes(MapFlags.IsBuildSite) === true &&
		newFlags.includes(MapFlags.IsBuildSite) === false &&
		data.old.mapItem.teamId !== 'NONE' &&
		data.old.mapItem.teamId === data.new.mapItem.teamId
	) {
		return {
			event: EventType.Won,
			byTeam: data.new.mapItem.teamId,
		};
	}

	if (
		oldFlags.includes(MapFlags.IsBuildSite) === false &&
		newFlags.includes(MapFlags.IsBuildSite) === false &&
		data.old.mapItem.teamId !== 'NONE' &&
		data.new.mapItem.teamId === 'NONE'
	) {
		return {
			event: EventType.Lost,
			byTeam: data.old.mapItem.teamId,
		};
	}

	if (
		oldFlags.includes(MapFlags.IsBuildSite) === true &&
		newFlags.includes(MapFlags.IsBuildSite) === false &&
		data.old.mapItem.teamId !== 'NONE' &&
		data.new.mapItem.teamId === 'NONE'
	) {
		return {
			event: EventType.ConstructionCancelled,
			byTeam: data.old.mapItem.teamId,
		};
	}

	return undefined;
}
