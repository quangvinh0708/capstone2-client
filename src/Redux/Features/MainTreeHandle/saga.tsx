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
import {
    addAndSendQuestion,
    addSuggestedQuestionToDB,
    apiDeleteSuggestQuestion,
    apiGenerateSuggestQuestions,
    apiGetOutputModelResult,
    apiGetQuestion,
    apiGetSuggestQuestion,
    updateQuestionInDB,
} from "./api";
import { keywords1, TreeData } from "../../../Config/data";
import { parse, stringify } from "query-string";
import { Button, MenuItem } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./saga.module.scss";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuOptionPopup from "../../../View/Components/Dashboard.tsx/Main/ReactTreeSortable/Common/MenuOptionPopup";
import { useDispatch } from "react-redux";
import { Fragment } from "react";

const handleKeywordTreeSaga = function* () {};

export const convertChildrenRecursive = (children: string[]) => {
    return children.map((childStr) => {
        let [title, id, childId = undefined] = childStr.split("-AND-");
        return {
            title,
            id,
            childId,
        };
    });
};

export const convertChildrenToStringRecursive = (children: string[]) => {
    let titles: string[] = [],
        ids: string[] = [];
    children.map((childStr) => {
        let [title, id] = childStr.split("-AND-");
        titles.push(title);
        ids.push(id);

        return childStr;
    });

    return { ids, titles };
};

export const appendParentInfo = (tempChildren, tempParent) => {
    return tempChildren.map((child) => {
        const parent = tempParent.find((p) => p.childId === child.id);
        if (parent) {
            return {
                ...child,
                parentId: parent.id,
                parentTitle: parent.title,
            };
        } else return child;
    });
};

export const appendKeywordSelectedRecursive = (
    keywordSelected: TreeData[][],
    keywords: TreeData[]
) => {
    keywords.forEach((keyword: TreeData) => {
        // if (keyword.id === )
    });
};

export const searchTree = (
    children,
    id1: string,
    y: TreeData | undefined = undefined
) => {
    for (let child of children) {
        if (child.id.toString().trim() === id1.toString().trim()) {
            y = child;
            return y;
        } else if (Array.isArray(child.children) && child.children.length) {
            y = searchTree(child.children, id1);
            if (y || y !== undefined) return y;
        }
    }
    if (y !== undefined) return y;
};

const searchKeywordSelectedInTree = (keywordSelected, id) => {
    let y: TreeData | undefined = undefined;
    if (y !== undefined) {
        return y;
    }
    for (let i = 0; i < keywordSelected.length; i++) {
        y = searchTree(keywordSelected[i], id);
        if (y !== undefined) {
            return y;
        }
    }
};

export const searchTree1 = (
    children,
    id1: string,
    y: TreeData | undefined = undefined
) => {
    for (let child of children) {
        if (child.id.toString().trim() === id1.toString().trim()) {
            y = child;
            return y;
        } else if (Array.isArray(child.tempChildren) && child.tempChildren) {
            y = searchTree1(child.tempChildren, id1);
            if (y) return y;
        }
    }
    if (y !== undefined) return y;
};

export const convertRelated = (tempChildren: TreeData[]) => {
    // if (tempChildren.length === 1) {
    //     return [{ ...tempChildren[0] }];
    // }
    let res: TreeData[] = [];
    for (let i = 0; i < tempChildren.length; i++) {
        for (let j = i; j < tempChildren.length; j++) {
            const child: any = searchTree1(res, tempChildren[i].id);

            if (tempChildren[i].id === tempChildren[j].parentId) {
                if (child && child.tempChildren && child.tempChildren.length) {
                    child.tempChildren.push(tempChildren[j]);
                } else if (child && !child.children) {
                    child.tempChildren = [];
                    child.tempChildren.push(tempChildren[j]);
                } else if (!child) {
                    const x = {
                        ...tempChildren[i],
                        tempChildren: [tempChildren[j]],
                    };
                    res.push(x);
                }
            } else {
                if (!child) {
                    res.push(tempChildren[i]);
                }
            }
        }
    }

    return res;
};

const ConvertTitleToTitleButton = ({ data }) => {
    const dispatch = useDispatch();
    const handleAddToQuestionListContainer = (cb) => {
        dispatch(mainTreeHandle.addListContainer.request(data));
        cb.close();
    };
    const handleDeleteQuestionInQuestionListContainer = () => {
        dispatch(mainTreeHandle.deleteKeywordSelected.request(data));
    };
    return (
        <div id={data.id}>
            <MenuOptionPopup
                facet={undefined}
                onDelete={handleDeleteQuestionInQuestionListContainer}
                children={(popupState) => (
                    <Button
                        variant="contained"
                        // color={"inherit"}
                        {...bindTrigger(popupState)}
                        sx={{
                            width: `100%`,
                            backgroundImage: `linear-gradient(#FFF, #FFF)`,
                            border: `none`,
                            color: `#000`,
                            fontSize: `16px`,
                            textTransform: `none !important`,
                        }}
                    >
                        {data.title}
                    </Button>
                )}
                menuChildren={(popupState) => {
                    return [
                        <MenuItem
                            onClick={() => {
                                handleAddToQuestionListContainer(popupState);
                            }}
                        >
                            Select
                        </MenuItem>,
                    ];
                }}
            />
        </div>
    );
};

const handleKeywordObj = function* (payload) {
    let keywordObj: any = null;
    console.log("payload", payload);

    if (payload.tempChildren) {
        const tempChildren = convertChildrenRecursive(
            Array.isArray(payload.tempChildren)
                ? payload.tempChildren
                : [payload.tempChildren]
        );
        const { titles: childrenTitles, ids: childrenIds } =
            convertChildrenToStringRecursive(
                Array.isArray(payload.tempChildren)
                    ? payload.tempChildren
                    : [payload.tempChildren]
            );
        const tempParent = convertChildrenRecursive(
            Array.isArray(payload.tempParent)
                ? payload.tempParent
                : [payload.tempParent]
        );
        const tempChildrenAfterAppendParentInfo = appendParentInfo(
            tempChildren,
            tempParent
        );
        const tempChildrenAfterConvertRelated = convertRelated(
            tempChildrenAfterAppendParentInfo
        );
        keywordObj = {
            ...payload,
            tempChildren: tempChildrenAfterConvertRelated,
            title: <ConvertTitleToTitleButton data={payload} />,
            childrenTitles,
            childrenIds,
        };
        console.log(
            "tempChildrenAfterAppendParentInfo",
            tempChildrenAfterAppendParentInfo
        );
    } else {
        keywordObj = {
            ...payload,
            title: <ConvertTitleToTitleButton data={payload} />,
        };
    }

    return keywordObj;
    yield;
};

const searchKeywordSelectedInTree1 = (keywordSelected, id) => {
    let y: TreeData | undefined = undefined;
    if (y !== undefined) {
        return y;
    }
    for (let i = 0; i < keywordSelected.length; i++) {
        y = searchTree1(keywordSelected[i], id);
        if (y !== undefined) {
            if (!keywordSelected[i][0].children) {
                keywordSelected[i][0].children = [];
                keywordSelected[i][0].children.push({
                    ...y,
                    title: <ConvertTitleToTitleButton data={y} />,
                });
            } else {
                keywordSelected[i][0].children.push({
                    ...y,
                    title: <ConvertTitleToTitleButton data={y} />,
                });
            }
            // console.log("keywordSelected[i]", keywordSelected[i]);

            // console.log("y special", y);

            return y;
        }
    }
};

export const searchSupportForSwapByChild = (
    children,
    keywordObj: any,
    y: TreeData | undefined = undefined
) => {
    for (let child of children) {
        if (keywordObj.childrenIds.includes(child.id)) {
            if (keywordObj.children && keywordObj.children.length) {
                keywordObj.children.push({
                    ...child,
                    // title: <ConvertTitleToTitleButton data={child} />,
                });
                y = keywordObj;
            } else {
                keywordObj.children = [];
                keywordObj.children.push({
                    ...child,
                    // title: <ConvertTitleToTitleButton data={child} />,
                });
                y = keywordObj;
            }
            return y;
        }
    }
    if (y !== undefined) return y;
};

const swapByChild = (keywordSelected, keywordObj) => {
    let y: any = undefined;
    const changedIndexs: any[] = [];
    for (let i = 0; i < keywordSelected.length; i++) {
        y = searchSupportForSwapByChild(keywordSelected[i], keywordObj);
        if (y !== undefined) {
            changedIndexs.push(i);
            keywordSelected[i] = y;
            // console.log("keywordSelected[i] swapByChild", keywordSelected[i]);

            // console.log("y swapByChild", y);
        }
    }
    let j = 0;
    if (changedIndexs.length) {
        for (let i = 0; i < changedIndexs.length; i++) {
            keywordSelected.splice(changedIndexs[i] - j, 1);
            j++;
        }
        // console.log("changedIndexs", changedIndexs);
        // console.log("keywordObj", keywordObj);
        // console.log("keywordSelected", keywordSelected);
        keywordSelected.push([keywordObj]);
        return keywordSelected;
    }
};

const searchForDeletingKeywordSelected = (
    children,
    id1: string,
    y: any = undefined
) => {
    for (let i = 0; i < children.length; i++) {
        if (children[i].id.toString().trim() === id1.toString().trim()) {
            children.splice(i, 1);
            y = {};
            return y;
        } else if (
            Array.isArray(children[i].children) &&
            children[i].children
        ) {
            y = searchForDeletingKeywordSelected(children[i].children, id1);
            if (y) return y;
        }
    }
    if (y !== undefined) {
        console.log("Y = CHILD 2", y);
        return y;
    }
};

const handleDeleteKeywordSelected = (keywordSelected, payload) => {
    const { id } = payload;
    let y: TreeData | undefined = undefined;
    if (y !== undefined) {
        return y;
    }
    for (let i = 0; i < keywordSelected.length; i++) {
        for (let j = 0; j < keywordSelected[i].length; j++) {
            if (keywordSelected[i][j].id === id) {
                keywordSelected[i].splice(j, 1);
                if (keywordSelected[i].length === 0) {
                    keywordSelected.splice(i, 1);
                }
                return { root: true, index: i };
            }
        }
    }

    for (let i = 0; i < keywordSelected.length; i++) {
        y = searchForDeletingKeywordSelected(keywordSelected[i], id);
        if (y) {
            return { root: false, index: i };
        }
    }
};

export const searchTree2 = (
    children,
    id1: string,
    y: TreeData | undefined = undefined
) => {
    for (let child of children) {
        if (child.id.toString().trim() === id1.toString().trim()) {
            y = child;
            return y;
        } else if (Array.isArray(child.children) && child.children) {
            y = searchTree2(child.children, id1);
            if (y) return y;
        }
    }
    if (y !== undefined) return y;
};

const supportSearchTree2 = (keywordSelected, payload) => {
    const { id } = payload;
    let y: TreeData | undefined = undefined;
    if (y !== undefined) {
        return y;
    }

    for (let i = 0; i < keywordSelected.length; i++) {
        y = searchTree2(keywordSelected[i], id);
        if (y) {
            console.log("--------------- Y --------------", y);
            console.log("KEY WORD AFTER Y", keywordSelected);
            return y;
        }
    }
};

const deleteKeywordSelectedSaga = function* ({ payload }) {
    const keywordSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.keywordSelected
    );

    const x = supportSearchTree2(keywordSelected, payload);

    if (x && x.children && x.children.length) {
        let arr: string[] = [];
        for (let i = 0; i < x.children.length; i++) {
            arr.push((x.children[i] as any).id as any);
        }
        arr.push(x.id);
        yield put(mainTreeHandle.filterKeywordSelected.success(arr));
    } else {
        yield put(mainTreeHandle.deleteKeywordSelected.success(payload));
    }

    try {
        let keywordExist = handleDeleteKeywordSelected(
            keywordSelected,
            payload
        );
        if (!keywordExist) {
            yield call(
                callToastBySaga,
                payload,
                `${payload.title} does not exist`
            );
            return;
        }
        const { root } = keywordExist;

        if (root) {
            yield put(
                mainTreeHandle.swapKeywordSelected.success([[{ children: [] }]])
            );
            yield delay(100);
            // yield put(
            //     mainTreeHandle.openCircularLoading.success({
            //         index: undefined,
            //         isOpen: false,
            //     })
            // );
            yield put(
                mainTreeHandle.swapKeywordSelected.success(keywordSelected)
            );
        } else {
            const newKeyword = expandedKeywordSelected(keywordSelected);
            yield put(mainTreeHandle.swapKeywordSelected.success(newKeyword));
        }
    } catch (err) {
        console.log(err);
    }
};

const expandedKeywordSelected = (keywordSelected) => {
    return keywordSelected.map((k) => {
        let x: any[] = [];
        for (let j = 0; j < k.length; j++) {
            x.push({
                ...k[j],
                expanded: true,
            });
        }
        return x;
    });
};

const addKeywordToKeywordCardSaga = function* ({ payload }) {
    const keywordSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.keywordSelected
    );

    const keywordObj = yield call(handleKeywordObj, payload);

    console.log("keywordObj", keywordObj);

    if (!keywordSelected.length) {
        yield put(mainTreeHandle.addKeywordSelected.success([[keywordObj]]));
    } else {
        let keywordExist = searchKeywordSelectedInTree(
            keywordSelected,
            payload.id
        );

        if (keywordExist) {
            yield call(
                callToastBySaga,
                payload,
                `${payload.title.toUpperCase()} is already choosed`
            );
            console.log("keywordExist YES", keywordExist);

            return;
        }
        console.log("keyword as children Exist: NO", keywordExist);

        const xRes = searchKeywordSelectedInTree1(keywordSelected, payload.id);
        console.log("X RESULT", xRes);
        if (xRes) {
            console.log("--------------------------------");
            const newKeyword1 = expandedKeywordSelected(keywordSelected);
            if (newKeyword1.length > 3) {
                yield call(
                    callToastBySaga,
                    payload,
                    `Maximum number of keyword tree selection is 3`
                );
                return;
            }
            yield put(
                mainTreeHandle.addKeywordSelected.success(keywordSelected)
            );
            yield delay(100);
            yield put(mainTreeHandle.addKeywordSelected.success(newKeyword1));
            return;
        } else {
            console.log("keywordSelected CHANGE ??????", keywordSelected);
            if (keywordObj.childrenIds && keywordObj.childrenIds.length) {
                const result = swapByChild(keywordSelected, keywordObj);
                console.log("result", result);
                if (result) {
                    const newKeyword1 = expandedKeywordSelected(result);
                    if (newKeyword1.length > 3) {
                        yield call(
                            callToastBySaga,
                            payload,
                            `Maximum number of keyword tree selection is 3`
                        );
                        return;
                    }
                    yield put(
                        mainTreeHandle.addKeywordSelected.success(result)
                    );
                    yield delay(100);
                    yield put(
                        mainTreeHandle.addKeywordSelected.success(newKeyword1)
                    );
                    return;
                } else {
                    const tempNewKeywordSelected = [
                        ...keywordSelected,
                        [keywordObj],
                    ];

                    if (tempNewKeywordSelected.length > 3) {
                        yield call(
                            callToastBySaga,
                            payload,
                            `Maximum number of keyword tree selection is 3`
                        );
                        return;
                    }

                    yield put(
                        mainTreeHandle.addKeywordSelected.success(
                            tempNewKeywordSelected
                        )
                    );
                }
            } else {
                const tempNewKeywordSelected = [
                    ...keywordSelected,
                    [keywordObj],
                ];

                if (tempNewKeywordSelected.length > 3) {
                    yield call(
                        callToastBySaga,
                        payload,
                        `Maximum number of keyword tree selection is 3`
                    );
                    return;
                }

                yield put(
                    mainTreeHandle.addKeywordSelected.success(
                        tempNewKeywordSelected
                    )
                );
            }
        }
    }
};

const callToastBySaga = function* (payload, errMsg, styleObj: any = {}) {
    toast.warning(
        <div>
            <Button
                className={styles.toastContainer}
                // sx={{ width: `100%`, color: `#face10` }}
            >
                <ErrorIcon className={styles.errorToastIcon} sx={styleObj} />
                {errMsg}
            </Button>
        </div>,
        {
            autoClose: 3700,
            closeOnClick: true,
            hideProgressBar: true,
            icon: false,
            position: `bottom-left`,
        }
    );
    yield;
};

export const callToastInSaga = function (errMsg, styleObj: any = {}) {
    toast.warning(
        <div>
            <Button
                className={styles.toastContainer}
                // sx={{ width: `100%`, color: `#face10` }}
            >
                <ErrorIcon className={styles.errorToastIcon} sx={styleObj} />
                {errMsg}
            </Button>
        </div>,
        {
            autoClose: 3700,
            closeOnClick: true,
            hideProgressBar: true,
            icon: false,
            position: `bottom-left`,
        }
    );
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
        yield call(callToastBySaga, {}, "You need to choose a facet", {
            color: `red`,
        });
        return;
    } else if (listContainer.length === 3) {
        yield call(callToastBySaga, {}, "Maximum number of selection is 3", {
            color: `#f1c40f`,
        });
        return;
    }

    const findKeyword: Container[] = listContainer.find(
        (x) => x.keyword.id === payload.id
    );

    if (findKeyword) {
        yield call(callToastBySaga, {}, `${payload.title} is already selected`);
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
    console.log("payload 1", payload);
    yield delay(3000);
    try {
        const res = yield call(apiGetSuggestQuestion, payload);
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
    yield delay(3700);
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
}: PayloadAction<any, TreeData & { isOverride?: boolean }>) {
    const facetSelected = yield select(
        (state: IRootState) => state.mainTreeHandle.facetSelected
    );

    const listContainer = yield select(
        (state: IRootState) => state.mainTreeHandle.listContainer
    );

    const currentFacet = yield select(
        (state: IRootState) => state.mainTreeHandle.currentFacet
    );

    const suggestQuestions = yield select(
        (state: IRootState) => state.mainTreeHandle.suggestQuestions
    );

    if (payload.isOverride) {
        console.log("payloadddddddd isOverride", payload);

        delete payload.isOverride;
        const newSuggestQuestions = [];
        const newListContainer = listContainer.map((container) => {
            return {
                ...container,
                facet: currentFacet,
            };
        });
        yield put(
            mainTreeHandle.addFacetSelected.success({
                facetSelected: currentFacet,
                newSuggestQuestions,
                newListContainer,
            })
        );
        yield put(mainTreeHandle.openDialog.success(false));
        return;
    }

    try {
        console.log("payloadddddddd1", payload);

        let x = suggestQuestions.find((sq) => sq.questions.length > 0);
        if (x && facetSelected[0].id !== payload.id) {
            yield put(mainTreeHandle.openDialog.success(true));
        } else {
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
}: PayloadAction<any, TreeData>) {
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
                // TreeData: payload.facet,
            };
        });
    } catch (err) {
        console.log(err);
    }
};

const handleAddSuggestedQuestionToDB = function* ({ payload }) {
    console.log(payload);
    try {
        yield put(mainTreeHandle.openLoadingForSavingProgress.success(true));
        yield call(addSuggestedQuestionToDB, {
            ...payload,
            id: payload._id,
            point: {
                pointHigh: Number(payload.point.pointHigh),
                pointMedium: Number(payload.point.pointMedium),
                pointLow: Number(payload.point.pointLow),
            },
            trait: payload.facet.parentTitle,
            facet: payload.facet.title,
            keyword: payload.keyword.title,
        });
        yield delay(2000);
        yield put(mainTreeHandle.setErrorMessage.success("Added Successfully"));
    } catch (err: any) {
        yield delay(2000);
        if (err.response.data) {
            yield put(
                mainTreeHandle.setErrorMessage.success(err.response.data.error)
            );
            return;
        }
        yield put(mainTreeHandle.setErrorMessage.success("Unknown error!"));
    }
};

const handleDeleteSuggestedQuestion = function* ({ payload }) {
    console.log(payload);
    try {
        yield put(mainTreeHandle.openLoadingForSavingProgress.success(true));
        const res = yield call(apiDeleteSuggestQuestion, payload._id);
        yield delay(2000);
        yield put(
            mainTreeHandle.setErrorMessage.success("Deleted Successfully")
        );
        yield put(
            mainTreeHandle.deleteSuggestedQuestion.success({
                _id: payload._id,
                facet: payload.facet,
            })
        );
        yield put(
            mainTreeHandle.openDialogForDeletingSuggestedQuestion.success(false)
        );
    } catch (err) {
        console.log("err", err);
    }
};

const handleDeleteFacetSelectedRequestSaga = function* ({ payload }) {
    try {
        yield put(mainTreeHandle.deleteFacetSelected.success(payload));
        yield put(mainTreeHandle.setCurrentFacet.success(undefined));
    } catch (err) {
        console.log(err);
    }
};

const findChildIdOfNode = (children: TreeData[], res: string[]) => {
    for (let i = 0; i < children.length; i++) {
        res.push(children[i].id);
        if (children[i].children && children[i].children?.length) {
            findChildIdOfNode(children, res);
        }
    }

    return res;
};

const handleUpdateQuestionInDBSaga = function* ({ payload }) {
    console.log(payload);
    try {
        yield put(mainTreeHandle.openLoadingForSavingProgress.success(true));
        const dataConverted = {
            ...payload,
            point: {
                pointHigh: Number(payload.point.pointHigh),
                pointMedium: Number(payload.point.pointMedium),
                pointLow: Number(payload.point.pointLow),
            },
        };
        yield call(updateQuestionInDB, dataConverted);
        yield delay(2000);
        yield put(
            mainTreeHandle.setErrorMessage.success("Updated Successfully")
        );
        yield put(mainTreeHandle.updateQuestionInDB.success(dataConverted));
    } catch (err: any) {
        yield delay(2000);
        if (err.response.data) {
            yield put(
                mainTreeHandle.setErrorMessage.success(err.response.data.error)
            );
            return;
        }
        yield put(mainTreeHandle.setErrorMessage.success("Unknown error!"));
    }
};

const handleFilterKeywordSelectedRequestSaga = function* ({ payload }) {
    const {
        node: { children },
        expanded,
    } = payload;

    try {
        if (!expanded) {
            const IdResultArr = findChildIdOfNode(children, []);
            yield put(
                mainTreeHandle.filterKeywordSelected.success(IdResultArr)
            );
        }
    } catch (err) {
        console.log(err);
    }
};

const handleGetQuestionsSaga = function* ({
    payload,
}: PayloadAction<any, Container>) {
    yield delay(3000);
    try {
        const res = yield call(apiGetQuestion, payload);
        yield put(
            mainTreeHandle.getQuestions.success({
                ...payload,
                questions: res.data,
            })
        );
    } catch (err) {
        console.log(err);
    }
};

const handleAddAndSendQuestionSaga = function* ({
    payload,
}: PayloadAction<any, any>) {
    console.log("------- 1 ---------", payload);
    try {
        yield put(mainTreeHandle.openLoadingForSavingProgress.success(true));
        const dataConverted = {
            ...payload,
            id: payload._id,
            point: {
                pointHigh: Number(payload.point.pointHigh),
                pointMedium: Number(payload.point.pointMedium),
                pointLow: Number(payload.point.pointLow),
            },
            trait: payload.facet.parentTitle,
            facet: payload.facet.title,
            keyword: payload.keyword.title,
        };
        yield call(addAndSendQuestion, dataConverted);
        yield delay(2000);
        yield put(
            mainTreeHandle.setErrorMessage.success("Sended Successfully")
        );
        yield put(mainTreeHandle.updateQuestionInDB.success(dataConverted));
    } catch (err: any) {
        yield delay(2000);
        if (err.response.data) {
            yield put(
                mainTreeHandle.setErrorMessage.success(err.response.data.error)
            );
            return;
        }
        yield put(mainTreeHandle.setErrorMessage.success("Unknown error!"));
    }
};

const handleGetNotificationSaga = function* () {
    try {
        const res = yield call(apiGetQuestion, {
            keyword: { title: "" },
            facet: { title: "" },
        } as any);
        yield delay(500);
        yield put(mainTreeHandle.getNotificationAction.success(res.data));
    } catch (err) {
        console.log(" err", err);
    }
};

const handleGetOutputModelResultSaga = function* ({ payload }) {
    console.log("payload", payload);
    try {
        const res = yield call(apiGetOutputModelResult, {
            ...payload,
            key: "MBe2IdLb-9dhasuidad02316156156552352sdggsdgsdaga92345iosfiashfkja",
        });

        // yield delay(500);
        yield put(
            mainTreeHandle.getOutputModelResult.success({
                ...payload,
                outputModel: res.data.outputModel,
            })
        );
        console.log("res", res);
    } catch (err) {
        console.log(" err", err);
    }
};

const handleGenerateSuggestQuestionsSaga = function* ({ payload }) {
    console.log("payload", payload);
    try {
        const res = yield call(apiGenerateSuggestQuestions, {
            body: [payload["keyword"]["title"], payload["facet"]["title"]],
        });
        yield put(
            mainTreeHandle.generateSuggestQuestions.success({
                ...payload,
                questions: res.data,
            })
        );
        // console.log("res", res);
    } catch (err) {
        console.log(" err", err);
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
            mainTreeHandle.deleteKeywordSelected.request,
            deleteKeywordSelectedSaga
        ),
        takeLatest(
            mainTreeHandle.addListContainer.request,
            handleAddToListContainerSaga
        ),
        takeLatest(
            mainTreeHandle.addSuggestQuestions.request,
            handleAddSuggestQuestionsSaga
        ),
        takeLatest(
            mainTreeHandle.addAndSendQuestion.request,
            handleAddAndSendQuestionSaga
        ),
        takeLatest(
            mainTreeHandle.updateQuestionInDB.request,
            handleUpdateQuestionInDBSaga
        ),
        takeEvery(
            mainTreeHandle.getSuggestQuestions.request,
            handleGetSuggestQuestionsSaga
        ),
        takeEvery(mainTreeHandle.getQuestions.request, handleGetQuestionsSaga),
        takeEvery(
            mainTreeHandle.clearSuggestQuestions.request,
            handleClearSuggestQuestions
        ),
        takeLatest(
            mainTreeHandle.addFacetSelected.request,
            handleAddFacetSelected
        ),
        takeLatest(
            mainTreeHandle.deleteFacetSelected.request,
            handleDeleteFacetSelectedRequestSaga
        ),
        takeLatest(
            mainTreeHandle.addSuggestedQuestionToDB.request,
            handleAddSuggestedQuestionToDB
        ),
        takeLatest(
            mainTreeHandle.deleteSuggestedQuestion.request,
            handleDeleteSuggestedQuestion
        ),
        takeLatest(
            mainTreeHandle.filterKeywordSelected.request,
            handleFilterKeywordSelectedRequestSaga
        ),
        takeLatest(
            mainTreeHandle.getNotificationAction.request,
            handleGetNotificationSaga
        ),
        takeLatest(
            mainTreeHandle.generateSuggestQuestions.request,
            handleGenerateSuggestQuestionsSaga
        ),
        takeEvery(
            mainTreeHandle.getOutputModelResult.request,
            handleGetOutputModelResultSaga
        ),
        // takeLatest(
        //     mainTreeHandle.addFacetSelected.success,
        //     handleAddFacetSelectedSuccess
        // ),
    ];
}
