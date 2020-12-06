import {compose, concat, fromPairs, join, last, map, prop, slice, sortBy, split, toPairs} from "ramda";

// Задание 1
export type Team = { name: string; score: number };

export const getTopName = compose(
  prop<string, Team>("name"),
  last,
  sortBy(prop("score")),
  map((v: Team) => ({...v}))
);

// Задание 2
type OneValue = string | number | boolean | object;
export type QsObj = Record<string, OneValue>;

export const createQs = compose(
  concat("?"),
  join("&"),
  map(join("=")),
  toPairs as (qsObj: QsObj) => string[][]
);

// Задание 3
const stringToEntry = split("=");
export const parseQs = compose(fromPairs as (pairs: string[][]) => QsObj,
  map(stringToEntry),
  split("&"),
  slice(1, Infinity)
) as (p: string) => QsObj;
