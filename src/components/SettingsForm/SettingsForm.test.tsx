import 'jsdom-global/register';
import React from "react";
import {mount} from "enzyme";
import {Provider} from "react-redux";

import {SettingsFormResult} from "@/components/SettingsForm/SettingsFormikForm";
import {SettingsForm} from "@/components/SettingsForm/SettingsForm";
import {defaultGameState} from "@/rdx/game/gameState";
import {userLoggedIn} from "@/rdx/testConstants";
import {mockStore} from "@/rdx/mockStore";
import {start} from '@/rdx/game/gameSlice';
import {AppState} from "@/rdx/reducers";

describe("Settings form", () => {
    let store: any;
    beforeEach(async () => {
        store = mockStore({
            user: userLoggedIn,
            game: defaultGameState
        } as AppState)
    })

    const defaultValues: SettingsFormResult = {
        width: 10,
        height: 10,
        frequency: 2000
    };

    const changedValues: SettingsFormResult = {
        width: 15,
        height: 8,
        frequency: 1000
    };

    it("should process submit with default values", () => {
        const wrapper = mount(
            <Provider store={store}>
                <SettingsForm/>
            </Provider>
        );
        wrapper
            .find('button')
            .simulate('submit');
        expect(store.getActions()).toEqual([{
            type: start.type,
            payload: defaultValues
        }])
    });

    it("should process submit with changed values", () => {
        const wrapper = mount(
            <Provider store={store}>
                <SettingsForm/>
            </Provider>
        );
        wrapper
            .find('input[name="width"]')
            .simulate("change", {
                target: {value: changedValues.width},
            });
        wrapper
            .find('input[name="height"]')
            .simulate("change", {
                target: {value: changedValues.height},
            });
        wrapper
            .find('input[name="frequency"]')
            .simulate("change", {
                target: {value: changedValues.frequency / 1000},
            });
        wrapper
            .find('button')
            .simulate('submit');
        expect(store.getActions()).toEqual([{
            type: start.type,
            payload: changedValues
        }])
    });

});