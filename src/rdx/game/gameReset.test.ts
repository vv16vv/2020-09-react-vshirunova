import {gameAfterSeveralClicks} from "@/rdx/testConstants";
import {defaultGameState} from "@/rdx/game/gameState";
import gameSlice, {reset} from "@/rdx/game/gameSlice"

it('Game reset should reset jumps, clicks, coordinates and current frequency', () => {
    const state = gameSlice(gameAfterSeveralClicks, {
        type: reset.type
    });
    expect(state).toStrictEqual(defaultGameState);
});
