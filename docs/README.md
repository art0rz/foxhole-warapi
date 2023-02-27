foxhole-warapi

# foxhole-warapi

## Table of contents

### Enumerations

- [EventType](enums/EventType.md)
- [MapFlags](enums/MapFlags.md)
- [MapIconTypes](enums/MapIconTypes.md)

### Interfaces

- [CombinedMapData](interfaces/CombinedMapData.md)
- [DiffedMapData](interfaces/DiffedMapData.md)
- [Event](interfaces/Event.md)
- [MapData](interfaces/MapData.md)
- [MapItem](interfaces/MapItem.md)
- [MapTextItem](interfaces/MapTextItem.md)
- [WarInfo](interfaces/WarInfo.md)
- [WarReport](interfaces/WarReport.md)

### Type Aliases

- [MapMarkerType](README.md#mapmarkertype)
- [TeamId](README.md#teamid)

### Functions

- [combineDynamicWithStaticData](README.md#combinedynamicwithstaticdata)
- [determineEventStatusType](README.md#determineeventstatustype)
- [diffCombinedMapData](README.md#diffcombinedmapdata)
- [findNearestTextItem](README.md#findnearesttextitem)
- [getMapFlags](README.md#getmapflags)
- [hasMapFlag](README.md#hasmapflag)

## Type Aliases

### MapMarkerType

Ƭ **MapMarkerType**: ``"Major"`` \| ``"Minor"``

#### Defined in

[types.ts:99](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/types.ts#L99)

___

### TeamId

Ƭ **TeamId**: ``"WARDENS"`` \| ``"COLONIALS"`` \| ``"NONE"``

#### Defined in

[types.ts:1](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/types.ts#L1)

## Functions

### combineDynamicWithStaticData

▸ **combineDynamicWithStaticData**(`mapItems`, `mapTextItems`): [`CombinedMapData`](interfaces/CombinedMapData.md)[]

Matches each MapItem with the closest MapTextItem.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapItems` | [`MapItem`](interfaces/MapItem.md)[] |
| `mapTextItems` | [`MapTextItem`](interfaces/MapTextItem.md)[] |

#### Returns

[`CombinedMapData`](interfaces/CombinedMapData.md)[]

#### Defined in

[war-api.ts:24](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/war-api.ts#L24)

___

### determineEventStatusType

▸ **determineEventStatusType**(`data`): [`Event`](interfaces/Event.md) \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DiffedMapData`](interfaces/DiffedMapData.md) |

#### Returns

[`Event`](interfaces/Event.md) \| `undefined`

#### Defined in

[war-api.ts:74](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/war-api.ts#L74)

___

### diffCombinedMapData

▸ **diffCombinedMapData**(`data1`, `data2`): [`DiffedMapData`](interfaces/DiffedMapData.md)[]

Returns a list of CombinedMapData where the map flags or team id from the two arguments is different. Assumes that the order of the two lists is the same.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data1` | [`CombinedMapData`](interfaces/CombinedMapData.md)[] |
| `data2` | [`CombinedMapData`](interfaces/CombinedMapData.md)[] |

#### Returns

[`DiffedMapData`](interfaces/DiffedMapData.md)[]

#### Defined in

[war-api.ts:60](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/war-api.ts#L60)

___

### findNearestTextItem

▸ **findNearestTextItem**(`mapItem`, `mapTextItems`): [`MapTextItem`](interfaces/MapTextItem.md)

Given a MapItem and a list of MapTextItems, finds the nearest MapTextItem. This is useful for determining which town a MapItem belongs to.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapItem` | [`MapItem`](interfaces/MapItem.md) |
| `mapTextItems` | [`MapTextItem`](interfaces/MapTextItem.md)[] |

#### Returns

[`MapTextItem`](interfaces/MapTextItem.md)

#### Defined in

[war-api.ts:15](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/war-api.ts#L15)

___

### getMapFlags

▸ **getMapFlags**(`flags`): [`MapFlags`](enums/MapFlags.md)[]

Returns a list of each MapFlag that the flags contain.

#### Parameters

| Name | Type |
| :------ | :------ |
| `flags` | `number` |

#### Returns

[`MapFlags`](enums/MapFlags.md)[]

#### Defined in

[war-api.ts:50](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/war-api.ts#L50)

___

### hasMapFlag

▸ **hasMapFlag**(`flags`, `flag`): `boolean`

Returns true if the flags number contains the given MapFlag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `flags` | `number` |
| `flag` | [`MapFlags`](enums/MapFlags.md) |

#### Returns

`boolean`

#### Defined in

[war-api.ts:42](https://github.com/art0rz/foxhole-warapi/blob/f01d4a6/src/war-api.ts#L42)
