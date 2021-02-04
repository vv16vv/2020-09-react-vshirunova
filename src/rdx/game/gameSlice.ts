import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultGameState} from "@/rdx/game/gameState";

interface GameClickPayload {
    clickX: number;
    clickY: number;
}

interface GameJumpPayload {
    seedX: number;
    seedY: number;
}

export interface GameStartPayload {
    width: number;
    height: number;
    frequency: number;
}

const increaseFrequency = (oldFrequency: number): number => {
    return Math.max(10, Math.round(oldFrequency / 2))
}

const nextJumpCoord = (seed: number, quantity: number): number => {
    return Math.floor(seed * quantity + 1)
}

const gameSlice = createSlice({
    name: "game",
    initialState: defaultGameState,
    reducers: {
        start: (state, action: PayloadAction<GameStartPayload>) => {
            const {width, height, frequency} = action.payload
            state.width = width
            state.height = height
            state.initFrequency = frequency
            state.currFrequency = frequency
            state.clicks = 0
            state.jumps = 0
        },
        end: () => {
        },
        reset: (state) => {
            state.currFrequency = state.initFrequency
            state.clicks = 0
            state.jumps = 0
            state.x = 0
            state.y = 0
        },
        click: (state, action: PayloadAction<GameClickPayload>) => {
            const {clickX, clickY} = action.payload
            if (state.x === clickX && state.y === clickY) {
                state.currFrequency = increaseFrequency(state.currFrequency)
                state.jumps++
            }
            state.clicks++
        },
        jump: {
            reducer: (state, action: PayloadAction<GameJumpPayload>) => {
                const {width, height} = state
                const {seedX, seedY} = action.payload
                state.x = nextJumpCoord(seedX, width);
                state.y = nextJumpCoord(seedY, height);
            },
            prepare: () => {
                return {payload: {seedX: Math.random(), seedY: Math.random()}}
            }
        }
    }
})

export const {start, end, reset, click, jump} = gameSlice.actions

export default gameSlice.reducer