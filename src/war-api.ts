import { CombinedMapData, MapItem, MapTextItem } from './types';
import { distanceBetweenPoints } from './math';

export enum MapFlags {
	IsVictoryBase = 'IsVictoryBase',
	IsHomeBase = 'IsHomeBase', // Removed in v0.29
	IsBuildSite = 'IsBuildSite',
	IsScorched = 'IsScorched', // v0.22
	IsTownClaimed = 'IsTownClaimed', // v0.26
}

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
