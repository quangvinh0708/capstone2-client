import { createAsyncAction } from "typesafe-actions";

export const keywordTree = {
    getKeywords: createAsyncAction(
        "getKeywords/GET_KEYWORDS_REQUEST",
        "getKeywords/GET_KEYWORDS_SUCCESS",
        "getKeywords/GET_KEYWORDS_FAILURE"
    )<any, any, Error>(),
};
