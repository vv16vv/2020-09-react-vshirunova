import {assoc, compose, concat, fromPairs, join, last, map, prop, slice, sortBy, split, toPairs} from "ramda";

// Задание 1
export type Team = { name: string; score: number };

export const getTopName = compose(prop("name"), last, sortBy(prop("score")));

// Задание 2
type OneValue = string | number | boolean | object;
export type QsObj = Record<string, OneValue>;

export const createQs = compose(concat("?"),join("&"),map(join("=")),toPairs);

// Задание 3
const stringToEntry = split("=");
export const parseQs = compose(fromPairs, map(stringToEntry), split("&"), slice(1, Infinity));
