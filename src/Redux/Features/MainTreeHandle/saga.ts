import {
    call,
    put,
    takeLatest,
    select,
    delay,
    takeEvery,
} from "redux-saga/effects";
import { IRootState } from "../../Store/Reducers/combineReducers";
import { mainTreeHandle } from "./actions";
import { toast } from "react-toastify";
import { PayloadAction } from "typesafe-actions";
import { Container, SuggestQuestions } from "./reducer";
import { apiGetSuggestQuestion } from "./api";
import { Facet } from "../../../Config/data";

const handleKeywordTreeSaga = function* () {};

const addKeywordToKeywordCardSaga = function* ({ payload }) {
    const keywordSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.keywordSelected
    );
    const findKeyword = keywordSelected.find((x) => x.id === payload.id);
    if (findKeyword || keywordSelected.length >= 5) return;
    yield put(mainTreeHandle.addKeywordSelected.success(payload));
};

const handleAddToListContainerSaga = function* ({ payload }) {
    const keywordSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.keywordSelected
    );
    const facetSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.facetSelected
    );
    const listContainer = yield select(
        (state: IRootState) => state.mainTreeHandle.listContainer
    );
    if (!facetSelected.length) {
        toast.error("You need to choose a facet");
        return;
    } else if (listContainer.length === 3) {
        toast.warning("Maximum number of selection is two");
        return;
    }

    const findKeyword = listContainer.find((x) => x.keyword.id === payload.id);

    if (findKeyword) {
        toast.warning(`${payload.label} is already selected`);
        return;
    }

    yield put(
        mainTreeHandle.addListContainer.success({
            keyword: payload,
            facet: facetSelected[0],
        })
    );
};

const handleAddSuggestQuestionsSaga = async function* ({
    payload,
}: PayloadAction<any, Container>) {
    try {
        const res = await apiGetSuggestQuestion(payload);
        console.log("res", res);
        yield;
    } catch (err) {
        console.log(err);
    }
};

const handleGetSuggestQuestionsSaga = function* ({
    payload,
}: PayloadAction<any, Container>) {
    yield delay(3000);
    try {
        const res = yield call(apiGetSuggestQuestion, payload);
        console.log("res", res, "and payload", payload);
        yield put(
            mainTreeHandle.getSuggestQuestions.success({
                ...payload,
                questions: res.data,
            })
        );
    } catch (err) {
        console.log(err);
    }
};

const handleClearSuggestQuestions = function* ({
    payload,
}: PayloadAction<any, Container>) {
    yield delay(3000);
    try {
        yield put(
            mainTreeHandle.clearSuggestQuestions.success({
                ...payload,
            })
        );
    } catch (err) {
        console.log(err);
    }
};

const handleAddFacetSelected = function* ({
    payload,
}: PayloadAction<any, Facet & { isOverride?: boolean }>) {
    const facetSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.facetSelected
    );

    const listContainer = yield select(
        (state: IRootState) => state.mainTreeHandle.listContainer
    );

    const suggestQuestions = yield select(
        (state: IRootState) => state.mainTreeHandle.suggestQuestions
    );

    if (payload.isOverride) {
        delete payload.isOverride;
        const newSuggestQuestions = [];
        const newListContainer = listContainer.map((container) => {
            return {
                ...container,
                facet: payload,
            };
        });
        yield put(
            mainTreeHandle.addFacetSelected.success({
                facetSelected: payload,
                newSuggestQuestions,
                newListContainer,
            })
        );
        yield put(mainTreeHandle.openDialog.success(false));
        return;
    }

    try {
        let x = suggestQuestions.find((sq) => sq.questions.length > 0);
        console.log("X", x);
        if (x && facetSelected[0].id !== payload.id) {
            yield put(mainTreeHandle.openDialog.success(true));
        } else {
            if (payload.isOverride) delete payload.isOverride;

            const newListContainer = listContainer.map((container) => {
                return {
                    ...container,
                    facet: payload,
                };
            });
            yield put(
                mainTreeHandle.addFacetSelected.success({
                    facetSelected: payload,
                    newListContainer: newListContainer,
                })
            );
        }
    } catch (err) {
        console.log(err);
    }
};

const handleAddFacetSelectedSuccess = function* ({
    payload,
}: PayloadAction<any, Facet>) {
    const facetSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.facetSelected
    );
    const listContainer = yield select(
        (state: IRootState) => state.mainTreeHandle.listContainer
    );
    const suggestQuestions = yield select(
        (state: IRootState) => state.mainTreeHandle.suggestQuestions
    );

    try {
        const newSuggestQuestions = [];

        const newListContainer = listContainer.map((container) => {
            return {
                ...container,
                // facet: payload.facet,
            };
        });
    } catch (err) {
        console.log(err);
    }
};

export default function mainTreeHandleSaga() {
    return [
        takeLatest(
            mainTreeHandle.updateFacetSelected.request,
            handleKeywordTreeSaga
        ),
        takeLatest(
            mainTreeHandle.addKeywordSelected.request,
            addKeywordToKeywordCardSaga
        ),
        takeLatest(
            mainTreeHandle.addListContainer.request,
            handleAddToListContainerSaga
        ),
        takeLatest(
            mainTreeHandle.addSuggestQuestions.request,
            handleAddSuggestQuestionsSaga
        ),
        takeEvery(
            mainTreeHandle.getSuggestQuestions.request,
            handleGetSuggestQuestionsSaga
        ),
        takeEvery(
            mainTreeHandle.clearSuggestQuestions.request,
            handleClearSuggestQuestions
        ),
        takeLatest(
            mainTreeHandle.addFacetSelected.request,
            handleAddFacetSelected
        ),
        // takeLatest(
        //     mainTreeHandle.addFacetSelected.success,
        //     handleAddFacetSelectedSuccess
        // ),
    ];
}
