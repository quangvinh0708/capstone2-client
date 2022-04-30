import { call, put, takeLatest } from "redux-saga/effects";
import { keywordTree } from "./actions";

const handleKeywordTreeSaga = function* () {};

export default function keywordTreeSaga() {
    return [takeLatest(keywordTree.request, handleKeywordTreeSaga)];
}
