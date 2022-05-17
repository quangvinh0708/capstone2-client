import { Button } from "@mui/material";
import { createReducer } from "typesafe-actions";
import { facet, keywords, TreeData, facet1 } from "../../../Config/data";
import { updateFacetTreeView, updateKeywordsTreeView } from "./actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";



export interface FacetTreeViewState {
    facet: TreeData[];
}

const initialState = {
    facet: facet,
    keywords: keywords,
};

const TreeViewReducer = () =>
    createReducer(initialState)
        /* ------------- updateFacetTreeView ------------- */
        .handleAction(updateFacetTreeView.request, (state) => ({
            ...state,
        }))
        .handleAction(updateFacetTreeView.success, (state, action) => ({
            ...state,
            facet: action.payload,
        }))
        .handleAction(updateFacetTreeView.failure, (state, action) => ({
            ...state,
        }))

        /* ------------- updateKeywordsTreeView ------------- */
        .handleAction(updateKeywordsTreeView.request, (state) => ({
            ...state,
        }))
        .handleAction(updateKeywordsTreeView.success, (state, action) => ({
            ...state,
            facet: action.payload,
        }))
        .handleAction(updateKeywordsTreeView.failure, (state, action) => ({
            ...state,
        }));
export default TreeViewReducer;
