// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
    return teams.sort((a, b) => (a.score === b.score) ? 0 : (a.score > b.score) ? 1 : -1)
        ?.pop()
        ?.name ?? "";
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
    return "?" + Object.entries(qsObj)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
    return qs
        .substring(1) // remove first '?'
        .split("&")
        .map((param) => param.split("="))
        .reduce((acc, [k, v]) => {
            acc[k] = v
            return acc;
        }, {}) as QsObj
};
