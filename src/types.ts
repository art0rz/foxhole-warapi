export type TeamId = 'WARDENS' | 'COLONIALS' | 'NONE';

export interface MapItem {
	teamId: TeamId;
	iconType: number;
	x: number;
	y: number;
	flags: number;
}

export interface MapData {
	regionId: number;
	scorchedVictoryTowns: number;
	mapItems: Array<MapItem>;
	mapTextItems: Array<MapTextItem>;
	lastUpdated: number;
	version: number;
}

export type MapMarkerType = 'Major' | 'Minor';

export interface MapTextItem {
	text: string;
	x: number;
	y: number;
	mapMarkerType: MapMarkerType;
}
