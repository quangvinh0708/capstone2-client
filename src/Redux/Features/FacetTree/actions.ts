import { createAsyncAction } from "typesafe-actions";

export const facetTree = {
    getFacets: createAsyncAction(
        "getFacets/GET_FACETS_REQUEST",
        "getFacets/GET_FACETS_SUCCESS",
        "getFacets/GET_FACETS_FAILURE"
    )<any, any, Error>(),
};
