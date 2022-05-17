import { createAsyncAction } from "typesafe-actions";

export const updateFacetTreeView = createAsyncAction(
    "updateFacetTreeView/UPDATE_FACET_TREE_VIEW_REQUEST",
    "updateFacetTreeView/UPDATE_FACET_TREE_VIEW_SUCCESS",
    "updateFacetTreeView/UPDATE_FACET_TREE_VIEW_FAILURE"
)<any, any, Error>();

export const updateKeywordsTreeView = createAsyncAction(
    "updateKeywordsTreeView/UPDATE_KEYWORDS_TREE_VIEW_REQUEST",
    "updateKeywordsTreeView/UPDATE_KEYWORDS_TREE_VIEW_SUCCESS",
    "updateKeywordsTreeView/UPDATE_KEYWORDS_TREE_VIEW_FAILURE"
)<any, any, Error>();
