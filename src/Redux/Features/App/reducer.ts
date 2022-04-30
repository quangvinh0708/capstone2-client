import { createReducer } from "typesafe-actions";
import { app } from "./actions";

export interface AppState {
    active: boolean;
}

const initialState = {
    active: false,
} as { active: boolean };

const appReducer = () =>
    createReducer(initialState)
        /* ------------- usersAsync ------------- */
        .handleAction(app.request, (state) => ({
            ...state,
        }))
        .handleAction(app.success, (state, action) => ({
            ...state,
            active: true,
        }))
        .handleAction(app.failure, (state, action) => ({
            ...state,
            active: false,
        }));
export default appReducer;
