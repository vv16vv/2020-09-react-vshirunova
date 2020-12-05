// Задание 1

export type OriginalTeam = {
    size: number;
    name: string;
    league: string;
};

export type ExpectedTeam = {
    name: string;
    league: string;
    roster: number;
};

export const originalTeamToExpectedTeam1 = (
    originalTeam: OriginalTeam
): ExpectedTeam => {
    return Object.entries(originalTeam)
        .reduce((team, [k, v]) => {
            switch (k) {
                case "name": {
                    team[k] = "New York Badgers";
                    break;
                }
                case "league": {
                    team[k] = v as string;
                    break;
                }
                default:
                    break;
            }
            return team;
        }, {"roster": 25} as ExpectedTeam)
};

// Задание 2
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (originalArray: Readonly<SomeArray>): SomeArray => {
    return ["two", ...originalArray.slice(-2), 5];
};

// Задание 3

export type Team = {
    name: string;
    captain: {
        name: string;
        age: number;
    };
};

const isPrimitive = (obj: any) => {
    return (obj !== Object(obj));
}

type OneValue = string | number | boolean | object;
type ComplexObject = Record<string, OneValue>;

const deepCopyIncAge = (obj: ComplexObject): ComplexObject => {
    return Object.entries(obj)
        .reduce((team, [k, v]) => {
            if (k === "age") team[k] = (v as number) + 1;
            else if (isPrimitive(v)) {
                team[k] = v;
            } else team[k] = deepCopyIncAge(v as ComplexObject)

            return team;
        }, {} as ComplexObject);
}

export const originalTeamToExpectedTeam2 = (originalTeam: Team): Team => {
    return deepCopyIncAge(originalTeam) as Team;
}