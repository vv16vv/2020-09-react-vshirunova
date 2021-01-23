export interface GameState {
    width: number;
    height: number;
    initFrequency: number;
    currFrequency: number;
    x: number;
    y: number;
    jumps: number;
    clicks: number;
}

export const defaultGameState: GameState = {
    width: 10,
    height: 10,
    initFrequency: 2000,
    currFrequency: 2000,
    x: 0,
    y: 0,
    jumps: 0,
    clicks: 0,
}