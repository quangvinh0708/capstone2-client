import { createReducer } from "typesafe-actions";
import { Keyword, keywords } from "../../../Config/data";
import { keywordTree } from "./actions";

export interface KeywordTreeState {
    keywords: Keyword[];
}

const initialState: KeywordTreeState = {
    keywords: keywords,
};

const keywordTreeReducer = () =>
    createReducer(initialState)
        /* ------------- usersAsync ------------- */
        .handleAction(keywordTree.request, (state) => ({
            ...state,
        }))
        .handleAction(keywordTree.success, (state, action) => ({
            ...state,
            keywords: action.payload,
        }))
        .handleAction(keywordTree.failure, (state, action) => ({
            ...state,
        }));
export default keywordTreeReducer;
