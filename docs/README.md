foxhole-warapi

# foxhole-warapi

## Table of contents

### Enumerations

- [MapFlags](enums/MapFlags.md)

### Interfaces

- [MapData](interfaces/MapData.md)
- [MapItem](interfaces/MapItem.md)
- [MapTextItem](interfaces/MapTextItem.md)

### Type Aliases

- [MapMarkerType](README.md#mapmarkertype)
- [TeamId](README.md#teamid)

### Functions

- [combineDynamicWithStaticData](README.md#combinedynamicwithstaticdata)
- [findNearestTextItem](README.md#findnearesttextitem)
- [getMapFlags](README.md#getmapflags)
- [hasMapFlag](README.md#hasmapflag)

## Type Aliases

### MapMarkerType

Ƭ **MapMarkerType**: ``"Major"`` \| ``"Minor"``

#### Defined in

[types.ts:20](https://github.com/art0rz/foxhole-warapi/blob/4a63186/src/types.ts#L20)

___

### TeamId

Ƭ **TeamId**: ``"WARDENS"`` \| ``"COLONIALS"`` \| ``"NONE"``

#### Defined in

[types.ts:1](https://github.com/art0rz/foxhole-warapi/blob/4a63186/src/types.ts#L1)

## Functions

### combineDynamicWithStaticData

▸ **combineDynamicWithStaticData**(`mapItems`, `mapTextItems`): { `mapItem`: [`MapItem`](interfaces/MapItem.md) ; `mapTextItem`: [`MapTextItem`](interfaces/MapTextItem.md)  }[]

Matches each MapItem with the closest MapTextItem.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapItems` | [`MapItem`](interfaces/MapItem.md)[] |
| `mapTextItems` | [`MapTextItem`](interfaces/MapTextItem.md)[] |

#### Returns

{ `mapItem`: [`MapItem`](interfaces/MapItem.md) ; `mapTextItem`: [`MapTextItem`](interfaces/MapTextItem.md)  }[]

#### Defined in

[war-api.ts:32](https://github.com/art0rz/foxhole-warapi/blob/4a63186/src/war-api.ts#L32)

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

[war-api.ts:23](https://github.com/art0rz/foxhole-warapi/blob/4a63186/src/war-api.ts#L23)

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

[war-api.ts:61](https://github.com/art0rz/foxhole-warapi/blob/4a63186/src/war-api.ts#L61)

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

[war-api.ts:53](https://github.com/art0rz/foxhole-warapi/blob/4a63186/src/war-api.ts#L53)
