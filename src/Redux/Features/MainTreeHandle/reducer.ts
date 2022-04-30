import { createReducer } from "typesafe-actions";
import { Facet, Keyword } from "../../../Config/data";
import { mainTreeHandle } from "./actions";

export interface MainTreeHandleState {
    facetSelected: any[];
    keywordSelected: any[];
    listContainer: Container[];
    suggestQuestions: SuggestQuestions[];
    openDialog: boolean;
    isQuestionProcessingModalOpen: boolean;
    isLoadingForSavingProgress: boolean;
    errorMessage: string;
    openDialogForDeletingSuggestedQuestion: boolean;
}

export interface Question {
    id: string;
    question: string;
    big5EnvIndicator: string;
    tags: string[];
    // [index: string]: string;
}

export type SuggestQuestions = Container & {
    questions: Question[];
    isLoading: boolean;
};

type Partial<G> = {
    [I in keyof G as Exclude<I, "children" | "isExpanding">]: G[I];
};

export type Container = {
    keyword: Partial<Keyword>;
    facet: Partial<Facet>;
};

const initialState: MainTreeHandleState = {
    facetSelected: [],
    keywordSelected: [],
    listContainer: [],
    suggestQuestions: [],
    openDialog: false,
    isQuestionProcessingModalOpen: false,
    isLoadingForSavingProgress: false,
    errorMessage: "",
    openDialogForDeletingSuggestedQuestion: false,
};

const mainTreeHandleReducer = () =>
    createReducer(initialState)
        /* ------------- FACET SELECTED ------------- */
        /* ------------- updateFacetSelected ------------- */
        .handleAction(mainTreeHandle.updateFacetSelected.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.updateFacetSelected.success,
            (state, action) => ({
                ...state,
                facetSelected: action.payload,
            })
        )
        .handleAction(
            mainTreeHandle.updateFacetSelected.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- delete Facet Selected ------------- */
        .handleAction(mainTreeHandle.deleteFacetSelected.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.deleteFacetSelected.success,
            (state, action) => {
                const newFacetSelected = state.facetSelected.filter((x) => {
                    if (x.id === action.payload.id) {
                        return false;
                    } else return true;
                });
                return {
                    ...state,
                    facetSelected: newFacetSelected,
                    suggestQuestions: [],
                    listContainer: [],
                };
            }
        )
        .handleAction(
            mainTreeHandle.deleteFacetSelected.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- add Facet Selected ------------- */
        .handleAction(mainTreeHandle.addFacetSelected.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.addFacetSelected.success,
            (state, action) => {
                const {
                    payload: {
                        facetSelected,
                        newSuggestQuestions,
                        newListContainer,
                    },
                } = action;
                return {
                    ...state,
                    // facetSelected: [...state.facetSelected, action.payload],
                    facetSelected: [facetSelected],
                    suggestQuestions: newSuggestQuestions
                        ? newSuggestQuestions
                        : state.suggestQuestions,
                    listContainer: newListContainer
                        ? newListContainer
                        : state.listContainer,
                };
            }
        )
        .handleAction(
            mainTreeHandle.addFacetSelected.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- KEYWORD SELECTED ------------- */
        /* ------------- updateKeywordSelected ------------- */
        .handleAction(
            mainTreeHandle.updateKeywordSelected.request,
            (state) => ({
                ...state,
            })
        )
        .handleAction(
            mainTreeHandle.updateKeywordSelected.success,
            (state, action) => {
                const newKeywordSelected = state.keywordSelected.map((x) => {
                    if (x.id === action.payload.id) {
                        return action.payload;
                    } else return x;
                });
                return {
                    ...state,
                    keywordSelected: newKeywordSelected,
                };
            }
        )
        .handleAction(
            mainTreeHandle.updateKeywordSelected.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- deleteKeywordSelected ------------- */
        .handleAction(
            mainTreeHandle.deleteKeywordSelected.request,
            (state) => ({
                ...state,
            })
        )
        .handleAction(
            mainTreeHandle.deleteKeywordSelected.success,
            (state, action) => {
                const newKeywordSelected = state.keywordSelected.filter((x) => {
                    if (x.id === action.payload.id) {
                        return false;
                    } else return true;
                });
                const findKeyWordInListcontainer = state.listContainer.filter(
                    (container) => container.keyword.id !== action.payload.id
                );

                return {
                    ...state,
                    keywordSelected: newKeywordSelected,
                    listContainer: findKeyWordInListcontainer,
                };
            }
        )
        .handleAction(
            mainTreeHandle.deleteKeywordSelected.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- addKeywordSelected ------------- */
        .handleAction(mainTreeHandle.addKeywordSelected.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.addKeywordSelected.success,
            (state, action) => {
                return {
                    ...state,
                    keywordSelected: [...state.keywordSelected, action.payload],
                };
            }
        )
        .handleAction(
            mainTreeHandle.addKeywordSelected.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- LIST CONTAINER HANDLER ------------- */
        /* ------------- updateListContainer ------------- */
        .handleAction(mainTreeHandle.updateListContainer.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.updateListContainer.success,
            (state, action) => {
                const newKeywordSelected = state.keywordSelected.map((x) => {
                    if (x.id === action.payload.id) {
                        return action.payload;
                    } else return x;
                });
                return {
                    ...state,
                    keywordSelected: newKeywordSelected,
                };
            }
        )
        .handleAction(
            mainTreeHandle.updateListContainer.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- deleteListContainer ------------- */
        .handleAction(mainTreeHandle.deleteListContainer.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.deleteListContainer.success,
            (state, action) => {
                const newListContainer = state.listContainer.filter((x) => {
                    if (x.keyword.id === action.payload.id) {
                        return false;
                    } else return true;
                });
                return {
                    ...state,
                    listContainer: newListContainer,
                };
            }
        )
        .handleAction(
            mainTreeHandle.deleteListContainer.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- addListContainer ------------- */
        .handleAction(mainTreeHandle.addListContainer.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.addListContainer.success,
            (state, { payload: { keyword, facet } }) => {
                return {
                    ...state,
                    listContainer: [...state.listContainer, { keyword, facet }],
                };
            }
        )
        .handleAction(
            mainTreeHandle.addListContainer.failure,
            (state, action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- SUGGEST QUESTIONS ------------- */
        /* ------------- Update Suggest Questions ------------- */
        .handleAction(
            mainTreeHandle.updateSuggestQuestions.request,
            (state) => ({
                ...state,
            })
        )
        .handleAction(
            mainTreeHandle.updateSuggestQuestions.success,
            (state, action) => {
                const newSuggestQuestions = state.suggestQuestions.map((x) => {
                    if (x.id === action.payload.id) {
                        return action.payload;
                    } else return x;
                });
                return {
                    ...state,
                    keywordSelected: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.updateSuggestQuestions.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- Delete Suggest Questions ------------- */
        .handleAction(
            mainTreeHandle.deleteSuggestQuestions.request,
            (state) => ({
                ...state,
            })
        )
        .handleAction(
            mainTreeHandle.deleteSuggestQuestions.success,
            (state, action) => {
                const newSuggestQuestions = state.suggestQuestions.filter(
                    (x) => {
                        if (x.keyword.id === action.payload.id) {
                            return false;
                        } else return true;
                    }
                );
                return {
                    ...state,
                    listContainer: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.deleteSuggestQuestions.failure,
            (state, action) => ({
                ...state,
            })
        )

        /* ------------- Add Suggest Questions ------------- */
        .handleAction(mainTreeHandle.addSuggestQuestions.request, (state) => ({
            ...state,
        }))
        .handleAction(
            mainTreeHandle.addSuggestQuestions.success,
            (state, { payload: { keyword, facet } }) => {
                return {
                    ...state,
                    suggestQuestions: [
                        ...state.listContainer,
                        { keyword, facet },
                    ],
                };
            }
        )
        .handleAction(
            mainTreeHandle.addSuggestQuestions.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- Get Suggest Questions ------------- */
        .handleAction(
            mainTreeHandle.getSuggestQuestions.request,
            (state, { payload: { keyword, facet } }) => {
                let newSuggestQuestions: SuggestQuestions[] = [];
                const isContainerExists = state.suggestQuestions.find(
                    (sq: SuggestQuestions) => sq.keyword.id === keyword.id
                );
                if (isContainerExists) {
                    newSuggestQuestions = state.suggestQuestions.map(
                        (sq: SuggestQuestions) => {
                            if (sq.keyword.id === keyword.id) {
                                return {
                                    ...sq,
                                    isLoading: true,
                                    questions: [],
                                };
                            } else return sq;
                        }
                    );
                } else {
                    newSuggestQuestions = [
                        ...state.suggestQuestions,
                        { keyword, facet, isLoading: true },
                    ];
                }

                return {
                    ...state,
                    suggestQuestions: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.getSuggestQuestions.success,
            (state, { payload: { keyword, facet, questions } }) => {
                let newSuggestQuestions: SuggestQuestions[] = [];
                const isContainerExists = state.suggestQuestions.find(
                    (sq: SuggestQuestions) => sq.keyword.id === keyword.id
                );
                if (isContainerExists) {
                    newSuggestQuestions = state.suggestQuestions.map(
                        (sq: SuggestQuestions) => {
                            if (sq.keyword.id === keyword.id) {
                                return {
                                    ...sq,
                                    questions,
                                    isLoading: false,
                                };
                            } else return sq;
                        }
                    );
                } else {
                    newSuggestQuestions = [
                        ...state.suggestQuestions,
                        { keyword, facet, questions, isLoading: false },
                    ];
                }

                return {
                    ...state,
                    suggestQuestions: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.getSuggestQuestions.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- Clear Suggest Questions ------------- */
        .handleAction(
            mainTreeHandle.clearSuggestQuestions.request,
            (state, { payload: { keyword, facet } }) => {
                let newSuggestQuestions: SuggestQuestions[] = [];
                const isContainerExists = state.suggestQuestions.find(
                    (sq: SuggestQuestions) => sq.keyword.id === keyword.id
                );
                if (isContainerExists) {
                    newSuggestQuestions = state.suggestQuestions.map(
                        (sq: SuggestQuestions) => {
                            if (sq.keyword.id === keyword.id) {
                                return {
                                    ...sq,
                                    isLoading: true,
                                    questions: [],
                                };
                            } else return sq;
                        }
                    );
                } else {
                    newSuggestQuestions = [
                        ...state.suggestQuestions,
                        { keyword, facet, isLoading: true },
                    ];
                }

                return {
                    ...state,
                    suggestQuestions: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.clearSuggestQuestions.success,
            (state, { payload: { keyword, facet, questions } }) => {
                let newSuggestQuestions: SuggestQuestions[] = [];
                newSuggestQuestions = state.suggestQuestions.filter(
                    (sq: SuggestQuestions) => sq.keyword.id !== keyword.id
                );

                return {
                    ...state,
                    suggestQuestions: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.clearSuggestQuestions.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- Open Dialog ------------- */
        .handleAction(mainTreeHandle.openDialog.request, (state, _action) => {
            return {
                ...state,
            };
        })
        .handleAction(mainTreeHandle.openDialog.success, (state, action) => {
            return {
                ...state,
                openDialog: action.payload,
            };
        })
        .handleAction(mainTreeHandle.openDialog.failure, (state, _action) => {
            return {
                ...state,
                openDialog: false,
            };
        })

        /* ------------- Question Processing Modal ------------- */
        .handleAction(
            mainTreeHandle.openQuestionProcessingModal.request,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )
        .handleAction(
            mainTreeHandle.openQuestionProcessingModal.success,
            (state, action) => {
                return {
                    ...state,
                    isQuestionProcessingModalOpen: action.payload,
                };
            }
        )
        .handleAction(
            mainTreeHandle.openQuestionProcessingModal.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- ADD SUGGESTED QUESTION TO DATABASE ------------- */
        .handleAction(
            mainTreeHandle.addSuggestedQuestionToDB.request,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )
        .handleAction(
            mainTreeHandle.addSuggestedQuestionToDB.success,
            (state, action) => {
                return {
                    ...state,
                    isQuestionProcessingModalOpen: action.payload,
                };
            }
        )
        .handleAction(
            mainTreeHandle.addSuggestedQuestionToDB.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- OPEN LOADING FOR SAVING PROGRESS ------------- */
        .handleAction(
            mainTreeHandle.openLoadingForSavingProgress.success,
            (state, action) => {
                return {
                    ...state,
                    isLoadingForSavingProgress: action.payload,
                    errorMessage: action.payload ? state.errorMessage : "",
                };
            }
        )

        /* ------------- SET ERROR MESSAGE ------------- */
        .handleAction(
            mainTreeHandle.setErrorMessage.success,
            (state, action) => {
                return {
                    ...state,
                    errorMessage: action.payload,
                };
            }
        )

        /* ------------- DELETE SUGGESTED QUESTION ------------- */
        .handleAction(
            mainTreeHandle.deleteSuggestedQuestion.request,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )
        .handleAction(
            mainTreeHandle.deleteSuggestedQuestion.success,
            (state, { payload }) => {
                const { facet, _id: id } = payload;
                console.log("ID AND FACET", id, facet);

                const newSuggestQuestions = state.suggestQuestions.map((sq) => {
                    if (sq.facet.id === facet.id) {
                        const newQuestions = sq.questions.filter(
                            (question) => question._id !== id
                        );
                        return {
                            ...sq,
                            questions: newQuestions,
                        };
                    } else return sq;
                });
                return {
                    ...state,
                    // isLoadingForSavingProgress: false,
                    suggestQuestions: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.deleteSuggestedQuestion.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- OPEN DIALOG FOR DELETING SUGGESTED QUESTION ------------- */
        .handleAction(
            mainTreeHandle.openDialogForDeletingSuggestedQuestion.success,
            (state, action) => {
                return {
                    ...state,
                    openDialogForDeletingSuggestedQuestion: action.payload,
                };
            }
        );

export default mainTreeHandleReducer;   
