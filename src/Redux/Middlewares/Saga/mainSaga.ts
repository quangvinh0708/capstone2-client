import { all } from "redux-saga/effects";
import mainTreeHandleSaga from "../../Features/MainTreeHandle/saga";

function* mainSaga() {
    yield all([...mainTreeHandleSaga()]);
}
export default mainSaga;
