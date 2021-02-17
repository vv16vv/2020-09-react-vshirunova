import {gameAfterSeveralClicks} from "@/rdx/testConstants";
import gameSlice, {end} from "@/rdx/game/gameSlice"

it('Game end does nothing with state still', () => {
    const state = gameSlice(gameAfterSeveralClicks, {
        type: end.type
    });
    expect(state).toStrictEqual(gameAfterSeveralClicks);
});
