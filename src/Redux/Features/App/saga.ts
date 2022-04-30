import { call, put, takeLatest } from "redux-saga/effects";
import { app } from "./actions";

const handleAppSaga = function* () {};

export default function appSaga() {
    return [takeLatest(app.request, handleAppSaga)];
}
