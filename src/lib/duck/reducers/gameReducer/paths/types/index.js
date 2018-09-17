// @flow

export type Coord = [number, number]
export type Path = $ReadOnlyArray<Coord>
export type NamedPath = {|
  +id: string,
  +path: $ReadOnlyArray<Coord>
|}
export type PathsById = { [string]: NamedPath }
export type PathList = $ReadOnlyArray<string>
export type Paths = {|
  +byId: PathsById,
  +allIds: PathList
|}

