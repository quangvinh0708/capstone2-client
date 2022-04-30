import { createAsyncAction } from "typesafe-actions";

export const mainTreeHandle = {
    // ------------------- facet Selected ----------------------
    updateFacetSelected: createAsyncAction(
        "mainTreeHandle/UPDATE_FACET_SELECTED_REQUEST",
        "mainTreeHandle/UPDATE_FACET_SELECTED_SUCCESS",
        "mainTreeHandle/UPDATE_FACET_SELECTED_FAILURE"
    )<any, any, Error>(),
    addFacetSelected: createAsyncAction(
        "mainTreeHandle/ADD_FACET_SELECTED_REQUEST",
        "mainTreeHandle/ADD_FACET_SELECTED_SUCCESS",
        "mainTreeHandle/ADD_FACET_SELECTED_FAILURE"
    )<any, any, Error>(),
    deleteFacetSelected: createAsyncAction(
        "mainTreeHandle/DELETE_FACET_SELECTED_REQUEST",
        "mainTreeHandle/DELETE_FACET_SELECTED_SUCCESS",
        "mainTreeHandle/DELETE_FACET_SELECTED_FAILURE"
    )<any, any, Error>(),

    // ------------------- keyword Selected ----------------------
    updateKeywordSelected: createAsyncAction(
        "mainTreeHandle/UPDATE_KEYWORD_SELECTED_REQUEST",
        "mainTreeHandle/UPDATE_KEYWORD_SELECTED_SUCCESS",
        "mainTreeHandle/UPDATE_KEYWORD_SELECTED_FAILURE"
    )<any, any, Error>(),
    addKeywordSelected: createAsyncAction(
        "mainTreeHandle/ADD_KEYWORD_SELECTED_REQUEST",
        "mainTreeHandle/ADD_KEYWORD_SELECTED_SUCCESS",
        "mainTreeHandle/ADD_KEYWORD_SELECTED_FAILURE"
    )<any, any, Error>(),
    deleteKeywordSelected: createAsyncAction(
        "mainTreeHandle/DELETE_KEYWORD_SELECTED_REQUEST",
        "mainTreeHandle/DELETE_KEYWORD_SELECTED_SUCCESS",
        "mainTreeHandle/DELETE_KEYWORD_SELECTED_FAILURE"
    )<any, any, Error>(),

    // ------------------- List Container Handler  ----------------------
    updateListContainer: createAsyncAction(
        "updateListContainer/UPDATE_LIST_CONTAINER_REQUEST",
        "updateListContainer/UPDATE_LIST_CONTAINER_SUCCESS",
        "updateListContainer/UPDATE_LIST_CONTAINER_FAILURE"
    )<any, any, Error>(),
    addListContainer: createAsyncAction(
        "addListContainer/ADD_LIST_CONTAINER_REQUEST",
        "addListContainer/ADD_LIST_CONTAINER_SUCCESS",
        "addListContainer/ADD_LIST_CONTAINER_FAILURE"
    )<any, any, Error>(),
    deleteListContainer: createAsyncAction(
        "deleteListContainer/DELETE_LIST_CONTAINER_REQUEST",
        "deleteListContainer/DELETE_LIST_CONTAINER_SUCCESS",
        "deleteListContainer/DELETE_LIST_CONTAINER_FAILURE"
    )<any, any, Error>(),

    // ------------------- Suggest Question List  ----------------------
    updateSuggestQuestions: createAsyncAction(
        "updateSuggestQuestions/UPDATE_SUGGEST_QUESTIONS_REQUEST",
        "updateSuggestQuestions/UPDATE_SUGGEST_QUESTIONS_SUCCESS",
        "updateSuggestQuestions/UPDATE_SUGGEST_QUESTIONS_FAILURE"
    )<any, any, Error>(),
    deleteSuggestQuestions: createAsyncAction(
        "deleteSuggestQuestions/DELETE_SUGGEST_QUESTIONS_REQUEST",
        "deleteSuggestQuestions/DELETE_SUGGEST_QUESTIONS_SUCCESS",
        "deleteSuggestQuestions/DELETE_SUGGEST_QUESTIONS_FAILURE"
    )<any, any, Error>(),
    addSuggestQuestions: createAsyncAction(
        "addSuggestQuestions/ADD_SUGGEST_QUESTIONS_REQUEST",
        "addSuggestQuestions/ADD_SUGGEST_QUESTIONS_SUCCESS",
        "addSuggestQuestions/ADD_SUGGEST_QUESTIONS_FAILURE"
    )<any, any, Error>(),
    getSuggestQuestions: createAsyncAction(
        "getSuggestQuestions/GET_SUGGEST_QUESTIONS_REQUEST",
        "getSuggestQuestions/GET_SUGGEST_QUESTIONS_SUCCESS",
        "getSuggestQuestions/GET_SUGGEST_QUESTIONS_FAILURE"
    )<any, any, Error>(),
    clearSuggestQuestions: createAsyncAction(
        "clearSuggestQuestions/CLEAR_SUGGEST_QUESTIONS_REQUEST",
        "clearSuggestQuestions/CLEAR_SUGGEST_QUESTIONS_SUCCESS",
        "clearSuggestQuestions/CLEAR_SUGGEST_QUESTIONS_FAILURE"
    )<any, any, Error>(),

    // ------------------- Open Alert Dialog Slide  ----------------------
    openDialog: createAsyncAction(
        "openDialog/OPEN_DIALOG_REQUEST",
        "openDialog/OPEN_DIALOG_SUCCESS",
        "openDialog/OPEN_DIALOG_FAILURE"
    )<any, any, Error>(),

    // ------------------- QUESTION PROCESSING MODAL  ----------------------
    openQuestionProcessingModal: createAsyncAction(
        "openQuestionProcessingModal/OPEN_QUESTION_PROCESSING_MODAL_REQUEST",
        "openQuestionProcessingModal/OPEN_QUESTION_PROCESSING_MODAL_SUCCESS",
        "openQuestionProcessingModal/OPEN_QUESTION_PROCESSING_MODAL_FAILURE"
    )<any, any, Error>(),
    closeQuestionProcessingModal: createAsyncAction(
        "closeQuestionProcessingModal/CLOSE_QUESTION_PROCESSING_MODAL_REQUEST",
        "closeQuestionProcessingModal/CLOSE_QUESTION_PROCESSING_MODAL_SUCCESS",
        "closeQuestionProcessingModal/CLOSE_QUESTION_PROCESSING_MODAL_FAILURE"
    )<any, any, Error>(),
};
