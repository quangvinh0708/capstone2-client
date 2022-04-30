import { createAsyncAction } from "typesafe-actions";

export const keywordTree = createAsyncAction(
    "keywordTree/UPDATE_KEYWORD_TREE_REQUEST",
    "keywordTree/UPDATE_KEYWORD_TREE_SUCCESS",
    "keywordTree/UPDATE_KEYWORD_TREE_FAILURE"
)<any, any, Error>();
