import { call, delay, put, takeLatest } from "redux-saga/effects";
import { apiGetFacets } from "../MainTreeHandle/api";
import { facetTree } from "./actions";

const handleGetFacetSaga = function* ({}) {
    try {
        const res = yield call(apiGetFacets);
        yield put(facetTree.getFacets.success(res.data[0].facet));
    } catch (err) {
        console.log("err", err);
    }
};

export default function facetTreeSaga() {
    return [takeLatest(facetTree.getFacets.request, handleGetFacetSaga)];
}
