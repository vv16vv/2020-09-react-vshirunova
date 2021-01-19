import {Action} from "redux";
import {ActionTypes} from "@/rdx/actions";

interface SettingsState {
    width: number;
    height: number;
    frequency: number;
    userName: string;
}

const defaultSettingsState: SettingsState = {
    width: 10,
    height: 10,
    frequency: 2000,
    userName: ""
}

export interface SettingsSubmitPayload {
    width: number;
    height: number;
    frequency: number;
}

export interface SettingsSubmitAction extends Action {
    payload: SettingsSubmitPayload
}

export function settingsReducer(state: SettingsState = defaultSettingsState, action: SettingsSubmitAction): SettingsState {
    switch (action.type) {
        case ActionTypes.settingsSubmit: {
            const {width, height, frequency} = action.payload
            return {
                ...state,
                width: width,
                height: height,
                frequency: frequency
            }
        }
        default:
            return state
    }
}

export function settingsSubmit(payload: SettingsSubmitPayload): SettingsSubmitAction {
    return {
        type: ActionTypes.settingsSubmit,
        payload: payload
    }
}
