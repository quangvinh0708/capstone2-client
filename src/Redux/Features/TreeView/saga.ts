import { call, put, takeLatest } from "redux-saga/effects";
import { updateFacetTreeView } from "./actions";

const handleFacetTreeSaga = function* () {};

export default function facetTreeSaga() {
    return [takeLatest(updateFacetTreeView.request, handleFacetTreeSaga)];
}
