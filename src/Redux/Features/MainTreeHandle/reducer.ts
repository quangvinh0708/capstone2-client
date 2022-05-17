import { createReducer } from "typesafe-actions";
import { TreeData } from "../../../Config/data";
import {
    convertColor,
    convertColorRGBAGradient,
    randomStringColor,
} from "../../../View/Components/Dashboard.tsx/Main/ReactTreeSortable/Common/color";
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
    facetParentColor: any;
    facetChildColor: any;
    openCircularLoading: any;
    currentFacet?: TreeData;
    notifications: any;
    isNotificationsLoading: boolean;
}

export interface Question {
    id: string;
    question: string;
    big5EnvIndicator: string;
    tags?: string[];
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
    keyword: Partial<TreeData>;
    facet: Partial<TreeData>;
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
    facetParentColor: null,
    facetChildColor: null,
    openCircularLoading: false,
    currentFacet: undefined,
    notifications: [],
    isNotificationsLoading: false,
};

const changeStateValueWhenChangingFacetSelected = (arr) => {
    return arr.map((item) => {
        return {
            ...item,
            isQuestions: false,
            isSuggestedQuestions: false,
        };
    });
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
                const stringColor = randomStringColor();
                // const convertColor1 = convertColor(stringColor);
                const convertColor1 = convertColorRGBAGradient(stringColor);

                return {
                    ...state,
                    // facetSelected: [...state.facetSelected, action.payload],
                    facetSelected: [facetSelected],
                    facetParentColor: {
                        color: stringColor,
                        convertColor: convertColor1,
                    },
                    facetChildColor: {
                        color: `linear-gradient(90deg, rgba(100, 149, 237, 0.5), rgba(100, 149, 237, 0.7))`,
                        convertColor:
                            " linear-gradient(90deg, rgba(100, 149, 237, 0.5), rgba(100, 149, 237, 0.7))",
                    },
                    suggestQuestions: newSuggestQuestions
                        ? changeStateValueWhenChangingFacetSelected(
                              newSuggestQuestions
                          )
                        : changeStateValueWhenChangingFacetSelected(
                              state.suggestQuestions
                          ),
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

        /* ------------- OPEN CIRCULAR LOADING ------------- */
        .handleAction(
            mainTreeHandle.openCircularLoading.success,
            (state, { payload }) => ({
                ...state,
                openCircularLoading: payload,
            })
        )

        /* ------------- KEYWORD SELECTED ------------- */
        /* ------------- swapKeywordSelected ------------- */
        .handleAction(
            mainTreeHandle.swapKeywordSelected.success,
            (state, action) => {
                const newKeywordSelected = action.payload;
                console.log("action.payload in reducer", action.payload);
                return {
                    ...state,
                    keywordSelected: newKeywordSelected,
                };
            }
        )
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
                const { data, i: index } = action.payload;
                const newKeywordSelected = state.keywordSelected.map((x, i) => {
                    if (i === index) {
                        return data;
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
                const findKeyWordInListcontainer = state.listContainer.filter(
                    (container) => container.keyword.id !== action.payload.id
                );

                return {
                    ...state,
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
                    // keywordSelected: [...state.keywordSelected, action.payload],
                    keywordSelected: action.payload,
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
                                    isSuggestedQuestions: true,
                                    isQuestions: false,
                                };
                            } else return sq;
                        }
                    );
                } else {
                    newSuggestQuestions = [
                        ...state.suggestQuestions,
                        {
                            keyword,
                            facet,
                            questions,
                            isLoading: false,
                            isSuggestedQuestions: true,
                            isQuestions: false,
                        },
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
        )

        /* ------------- SET CURRENT FACET ------------- */
        .handleAction(
            mainTreeHandle.setCurrentFacet.success,
            (state, action) => {
                return {
                    ...state,
                    currentFacet: action.payload,
                };
            }
        )
        /* ------------- FILTER KEYWORD SELECTED  ------------- */
        .handleAction(
            mainTreeHandle.filterKeywordSelected.request,
            (state, action) => {
                return {
                    ...state,
                };
            }
        )
        .handleAction(
            mainTreeHandle.filterKeywordSelected.success,
            (state, action) => {
                let arr = action.payload;
                let newListContainer: Container[] = state.listContainer.filter(
                    (c, j) => {
                        if (arr.includes(c.keyword.id)) {
                            return false;
                        } else return true;
                    }
                );

                return {
                    ...state,
                    listContainer: newListContainer,
                };
            }
        )

        /* ------------- Get Questions ------------- */
        .handleAction(
            mainTreeHandle.getQuestions.request,
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
            mainTreeHandle.getQuestions.success,
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
                                    isQuestions: true,
                                    isSuggestedQuestions: false,
                                };
                            } else return sq;
                        }
                    );
                } else {
                    newSuggestQuestions = [
                        ...state.suggestQuestions,
                        {
                            keyword,
                            facet,
                            questions,
                            isLoading: false,
                            isQuestions: true,
                            isSuggestedQuestions: false,
                        },
                    ];
                }

                return {
                    ...state,
                    suggestQuestions: newSuggestQuestions,
                };
            }
        )
        .handleAction(mainTreeHandle.getQuestions.failure, (state, _action) => {
            return {
                ...state,
            };
        })

        /* ------------- Get Notification Action  ------------- */
        .handleAction(
            mainTreeHandle.getNotificationAction.request,
            (state, _action) => {
                return {
                    ...state,
                    notifications: [],
                    isNotificationsLoading: true,
                };
            }
        )
        .handleAction(
            mainTreeHandle.getNotificationAction.success,
            (state, action) => {
                return {
                    ...state,
                    notifications: action.payload,
                    isNotificationsLoading: false,
                };
            }
        )
        .handleAction(
            mainTreeHandle.getNotificationAction.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- Get Output model Result  ------------- */
        .handleAction(
            mainTreeHandle.getOutputModelResult.request,
            (state, action) => {
                const { id } = action.payload;
                const newNotifications = state.notifications.map((n) => {
                    if (n.id === id)
                        return {
                            ...n,
                            isLoading: true,
                        };
                    else return n;
                });
                return {
                    ...state,
                    notifications: newNotifications,
                };
            }
        )
        .handleAction(
            mainTreeHandle.getOutputModelResult.success,
            (state, action) => {
                const data = action.payload;
                const newNotifications = state.notifications.map((n) => {
                    if (data.id === n.id) {
                        return {
                            ...n,
                            outputModel:
                                data.outputModel === "Yes" ? "Right" : "Wrong",
                            isLoading: false,
                        };
                    } else return n;
                });
                return {
                    ...state,
                    notifications: newNotifications,
                };
            }
        )
        .handleAction(
            mainTreeHandle.getOutputModelResult.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        )

        /* ------------- UPDATE QUESTION IN DB  ------------- */
        .handleAction(
            mainTreeHandle.updateQuestionInDB.success,
            (state, action) => {
                const data = action.payload;
                const newNotifications = state.notifications.length
                    ? state.notifications.map((n) => {
                          if (data.id === n.id) {
                              return {
                                  ...n,
                                  point: action.payload.point,
                                  personality: action.payload.personality,
                              };
                          } else return n;
                      })
                    : state.notifications;

                const newSuggestQuestions = state.suggestQuestions.length
                    ? state.suggestQuestions.map((sq) => {
                          if (sq.isQuestions) {
                              const newQuestions = sq.questions.map((q) => {
                                  if (q.id === data.id) {
                                      return {
                                          ...q,
                                          personality: data.personality,
                                          point: data.point,
                                      };
                                  } else return q;
                              });
                              return {
                                  ...sq,
                                  questions: newQuestions,
                              };
                          } else return sq;
                      })
                    : state.suggestQuestions;

                return {
                    ...state,
                    notifications: newNotifications,
                    suggestQuestions: newSuggestQuestions,
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
                                    isSuggestedQuestions: true,
                                    isQuestions: false,
                                };
                            } else return sq;
                        }
                    );
                } else {
                    newSuggestQuestions = [
                        ...state.suggestQuestions,
                        {
                            keyword,
                            facet,
                            questions,
                            isLoading: false,
                            isSuggestedQuestions: true,
                            isQuestions: false,
                        },
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

        /* ------------- Get Suggest Questions ------------- */
        .handleAction(
            mainTreeHandle.generateSuggestQuestions.request,
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
            mainTreeHandle.generateSuggestQuestions.success,
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
                                    isSuggestedQuestions: true,
                                    isQuestions: false,
                                };
                            } else return sq;
                        }
                    );
                } else {
                    newSuggestQuestions = [
                        ...state.suggestQuestions,
                        {
                            keyword,
                            facet,
                            questions,
                            isLoading: false,
                            isSuggestedQuestions: true,
                            isQuestions: false,
                        },
                    ];
                }

                return {
                    ...state,
                    suggestQuestions: newSuggestQuestions,
                };
            }
        )
        .handleAction(
            mainTreeHandle.generateSuggestQuestions.failure,
            (state, _action) => {
                return {
                    ...state,
                };
            }
        );

export default mainTreeHandleReducer;
