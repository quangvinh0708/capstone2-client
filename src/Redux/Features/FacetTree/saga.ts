import { call, put, takeLatest } from "redux-saga/effects";
import { facetTree } from "./actions";

const handleFacetTreeSaga = function* () {};

export default function facetTreeSaga() {
    return [takeLatest(facetTree.request, handleFacetTreeSaga)];
}
