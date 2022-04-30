import { createAsyncAction } from "typesafe-actions";

export const facetTree = createAsyncAction(
    "facetTree/UPDATE_FACET_TREE_REQUEST",
    "facetTree/UPDATE_FACET_TREE_SUCCESS",
    "facetTree/UPDATE_FACET_TREE_FAILURE"
)<any, any, Error>();
