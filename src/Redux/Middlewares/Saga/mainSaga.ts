import { all } from "redux-saga/effects";
import facetTreeSaga from "../../Features/FacetTree/saga";
import keywordTreeSaga from "../../Features/KeywordTree/saga";
import mainTreeHandleSaga from "../../Features/MainTreeHandle/saga";

function* mainSaga() {
    yield all([
        ...mainTreeHandleSaga(),
        ...keywordTreeSaga(),
        ...facetTreeSaga(),
    ]);
}
export default mainSaga;
