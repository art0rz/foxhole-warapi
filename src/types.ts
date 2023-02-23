export type TeamId = 'WARDENS' | 'COLONIALS' | 'NONE';

export interface WarInfo {
	warId: string;
	warNumber: number;
	winner: TeamId;
	conquestStartTime: number;
	conquestEndTime: number | null;
	resistanceStartTime: number | null;
	requiredVictoryTowns: number;
}

export interface WarReport {
	totalEnlistments: number;
	colonialCasualties: number;
	wardenCasualties: number;
	dayOfWar: number;
	version: number;
}

export enum MapIconTypes {
	Static_Base_1 = 5, // Removed in v0.46
	Static_Base_2 = 6, // Removed in v0.46
	Static_Base_3 = 7, // Removed in v0.46
	Forward_Base_1 = 8,
	Forward_Base_2 = 9, // Removed in v0.50
	Forward_Base_3 = 10, // Removed in v0.50
	Hospital = 11,
	Vehicle_Factory = 12,
	Armory = 13,
	Supply_Station = 14,
	Workshop = 15,
	Manufacturing_Plant = 16,
	Refinery = 17,
	Shipyard = 18,
	Tech_Center = 19, // (Engineering Center in v0.37)
	Salvage_Field = 20,
	Component_Field = 21,
	Fuel_Field = 22,
	Sulfur_Field = 23,
	World_Map_Tent = 24,
	Travel_Tent = 25,
	Training_Area = 26,
	Special_Base_Keep = 27, // v0.14
	Observation_Tower = 28, // v0.14
	Fort = 29, // v0.14
	Troop_Ship = 30, // v0.14
	Sulfur_Mine = 32, // v0.16
	Storage_Facility = 33, // v0.17
	Factory = 34, // v0.17
	Garrison_Station = 35, // v0.20
	Ammo_Factory = 36, // v0.20
	Rocket_Site = 37, // v0.20
	Salvage_Mine = 38, // v0.22
	Construction_Yard = 39, // v0.26
	Component_Mine = 40, // v0.26
	Oil_Well = 41, // v0.26 // Removed in v0.50
	Relic_Base_1 = 45, // v0.32
	Relic_Base_2 = 46, // v0.32
	Relic_Base_3 = 47, // v0.32
	Mass_Production_Factory = 51, // v0.35
	Seaport = 52, // v0.37
	Coastal_Gun = 53, // v0.37
	Soul_Factory = 54, // v0.39
	Town_Base_1 = 56, // v0.46
	Town_Base_2 = 57, // v0.46
	Town_Base_3 = 58, // v0.46
	Storm_Cannon = 59, // v0.47
	Intel_Center = 60, // v0.47
	Coal_Field = 61, // v0.50
	Oil_Field = 62, // v0.50
}

export enum MapFlags {
	IsVictoryBase = 'IsVictoryBase',
	IsHomeBase = 'IsHomeBase', // Removed in v0.29
	IsBuildSite = 'IsBuildSite',
	IsScorched = 'IsScorched', // v0.22
	IsTownClaimed = 'IsTownClaimed', // v0.26
}

export interface MapItem {
	teamId: TeamId;
	iconType: MapIconTypes;
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

export interface CombinedMapData {
	mapItem: MapItem;
	mapTextItem: MapTextItem;
}

export interface DiffedMapData {
	old: {
		mapItem: MapItem;
		mapTextItem: MapTextItem;
	};
	new: {
		mapItem: MapItem;
		mapTextItem: MapTextItem;
	};
}

export enum EventType {
	Lost = 'Lost',
	UnderConstruction = 'UnderConstruction',
	ConstructionCancelled = 'ConstructionCancelled',
	Taken = 'Taken',
	Upgraded = 'Upgraded',
}

export interface Event {
	event: EventType;
	byTeam: TeamId;
}
