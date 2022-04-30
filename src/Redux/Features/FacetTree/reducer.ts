import { createReducer } from "typesafe-actions";
import { facet, Facet } from "../../../Config/data";
import { facetTree } from "./actions";

export interface FacetTreeState {
    facet: Facet[];
}

const initialState: FacetTreeState = {
    facet: facet,
};

const facetTreeReducer = () =>
    createReducer(initialState)
        /* ------------- usersAsync ------------- */
        .handleAction(facetTree.request, (state) => ({
            ...state,
        }))
        .handleAction(facetTree.success, (state, action) => ({
            ...state,
            facet: action.payload,
        }))
        .handleAction(facetTree.failure, (state, action) => ({
            ...state,
        }));
export default facetTreeReducer;
