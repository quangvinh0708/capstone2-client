import { call, delay, put, takeLatest } from "redux-saga/effects";
import { apiGetKeywords } from "../MainTreeHandle/api";
import { keywordTree } from "./actions";

const handleGetKeywordSaga = function* () {
    try {
        const res = yield call(apiGetKeywords);
        yield put(keywordTree.getKeywords.success(res.data[0].keywords));
    } catch (err) {
        console.log("err", err);
    }
};

export default function keywordTreeSaga() {
    return [takeLatest(keywordTree.getKeywords.request, handleGetKeywordSaga)];
}
