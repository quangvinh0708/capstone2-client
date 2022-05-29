import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import QuizIcon from "@mui/icons-material/Quiz";
import {
    Container,
    Question as QuestionType,
    SuggestQuestions,
} from "../../../../../Redux/Features/MainTreeHandle/reducer";
import CloseMenu from "../../../../Commons/CloseMenu/CloseMenu";
import { mainTreeHandle } from "../../../../../Redux/Features/MainTreeHandle/actions";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../../Redux/Store/Reducers/combineReducers";
import LinearWithValueLabel from "../../../../Commons/LinearProgress/LinearProgress";
import Question from "./Question/Question";
import { useStyles } from "./styles";
import { nanoid } from "nanoid";
import QuestionProcessingModal from "../../../../Commons/QuestionProcessingModal/QuestionProcessingModal";
import AlertDialogSlide from "../../../../Commons/AlertDialogSlide/AlertDialogSlide";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Typography, Button } from "@mui/material";
import { TraitLevel } from "../../../../../Utils/trait";
type Props = {
    container: Container;
    id: string;
};

export default function QuestionNestedList({ container, id }: Props) {
    const { keyword, facet } = container;

    const openDialogForDeletingSuggestedQuestion = useSelector(
        (state: IRootState) =>
            state.mainTreeHandle.openDialogForDeletingSuggestedQuestion
    );

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const [currentSuggestQuestion, setCurrentSuggestQuestion] = React.useState<
        (QuestionType & Container) | undefined
    >(undefined);

    let defaultScore = {
        pointHigh: 20,
        pointMedium: 15,
        pointLow: 10,
    };

    let paramState = [
        {
            Openness:
                currentSuggestQuestion?.facet?.parentTitle === "Openness"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Conciencetious:
                currentSuggestQuestion?.facet?.parentTitle === "Conciencetious"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Extraversion:
                currentSuggestQuestion?.facet?.parentTitle === "Extraversion"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Agreeable:
                currentSuggestQuestion?.facet?.parentTitle === "Agreeable"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Neuroticism:
                currentSuggestQuestion?.facet?.parentTitle === "Neuroticism"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
    ];

    const handleClickQuestion = (question) => {
        console.log("A QUESTIONNNNNNNNNNNNNNNN", question);
        setCurrentSuggestQuestion(question);
    };

    // React.useEffect(() => {
    //     if (!openDialogForDeletingSuggestedQuestion) {
    //         dispatch(mainTreeHandle.openQuestionProcessingModal.success(true));
    //     }
    // }, [openDialogForDeletingSuggestedQuestion]);

    const suggestQuestions = useSelector(
        (state: IRootState) => state.mainTreeHandle.suggestQuestions
    );

    const find = suggestQuestions.find((sq) => sq.keyword.id === keyword.id);

    const suggestQuestionsForThisContainer = find?.questions;

    if ((currentSuggestQuestion as any)?.custom === true && find) {
        (find as any).isQuestions = false;
        (find as any).isSuggestedQuestions = false;
    }

    const isLoading = suggestQuestions.find(
        (x) => x.keyword.id === keyword.id
    )?.isLoading;

    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseContainer = () => {
        dispatch(mainTreeHandle.deleteListContainer.success(container.keyword));
    };

    const handleGetSuggestQuestions = () => {
        dispatch(mainTreeHandle.getSuggestQuestions.request(container));
    };
    const handleGetQuestions = () => {
        dispatch(mainTreeHandle.getQuestions.request(container));
    };

    const handleClearSuggestQuestions = () => {
        dispatch(mainTreeHandle.clearSuggestQuestions.request(container));
    };

    const handleDeleteSuggestQuestion = (question) => {
        setCurrentSuggestQuestion(question);
        dispatch(
            mainTreeHandle.openDialogForDeletingSuggestedQuestion.success(true)
        );
    };

    const handleDeleteSuggestQuestionSuccess = () => {
        dispatch(
            mainTreeHandle.deleteSuggestedQuestion.request({
                ...currentSuggestQuestion,
                facet,
            })
        );
    };

    const handleClickCloseAlertDialogSlide = () => {
        dispatch(
            mainTreeHandle.openDialogForDeletingSuggestedQuestion.success(false)
        );
    };

    const handleGenerateSuggestQuestions = () => {
        dispatch(
            mainTreeHandle.generateSuggestQuestions.request({ keyword, facet })
        );
    };

    const handleCustomQuestion = (question: string) => {
        setCurrentSuggestQuestion((currentSuggestQuestion) => ({
            ...currentSuggestQuestion,
            question,
            facet,
            keyword,
            big5EnvIndicator: `${keyword.title} ${facet.title}`,
            id: "",
            custom: true,
            // point: defaultScore,
            // personality: paramState,
        }));
        dispatch(mainTreeHandle.openQuestionProcessingModal.success(true));
    };

    const handleChangeQuestionState = (question: string) => {
        setCurrentSuggestQuestion(
            (currentSuggestQuestion) =>
                ({
                    ...currentSuggestQuestion,
                    question,
                } as any)
        );
    };

    console.log("A find", find);
    console.log("A currentSuggestQuestion", currentSuggestQuestion);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: `48%`,
                marginTop: `30px`,
                // border: `1px solid black`,
                borderRadius: `7px`,
                position: `relative`,
                marginRight: `15px`,
                marginBottom: `8px`,
            }}
        >
            {((find as any)?.isQuestions ||
                (find as any)?.isSuggestedQuestions) && (
                <Button
                    variant="contained"
                    sx={{
                        position: `absolute`,
                        left: -16,
                        top: -25,
                        zIndex: 1000,
                        background: `#da5443`,
                        color: `#FFF`,
                        // padding: `7px`,
                        display: `block`,
                        textTransform: `none`,
                        "&:hover": {
                            background: `#da5443`,
                            // padding: `7px`,
                        },
                    }}
                >
                    {(find as any)?.isQuestions
                        ? "Questions"
                        : (find as any)?.isSuggestedQuestions
                        ? "Suggested Questions"
                        : ""}
                    <div
                        style={{
                            borderWidth: `16px`,
                            borderColor: `transparent #da5443 transparent transparent`,
                            borderStyle: `solid`,
                            position: `absolute`,
                            display: `block`,

                            top: 18,
                            left: -16,
                            zIndex: -2,
                            // padding: `0px 15px`,
                        }}
                    ></div>
                </Button>
            )}

            <List
                id={id}
                sx={{
                    width: "100%",
                    // maxWidth: `48%`,
                    bgcolor: "background.paper",
                    // marginTop: `20px`,
                    border: `1px solid black`,
                    borderRadius: `7px`,
                    position: `relative`,
                    // marginRight: `5px`,
                    // marginBottom: `8px`,

                    // Symbol CSS
                }}
                className={classes.questionList}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            // whiteSpace: `nowrap`,
                            textAlign: `center`,
                            textTransform: `none`,
                            background: `cornflowerblue`,
                            lineHeight: `37px !important`,
                            fontSize: `15px`,
                            color: "#FFFFFF",
                            "&:hover": {
                                backgroundImage: `linear-gradient(45deg, cornflowerblue 15%, #00d4ff 75%) !important`,
                                color: `#FFFFFF`,
                            },
                            cursor: `pointer`,
                            marginTop: `7px`,
                        }}
                        onClick={(e) => handleClick(e)}
                    >
                        {facet.parentTitle +
                            " >> " +
                            facet.title +
                            " >> " +
                            keyword.title}
                        {/* <div
                            style={{
                                display: `flex`,
                                textAlign: `center`,
                                justifyContent: `center`,
                            }}
                        >
                            <div>{facet.parentTitle + ""}</div>
                            <div
                                style={{
                                    margin: `2.5px 2px 0px 2px`,
                                }}
                            >
                                <DoubleArrowIcon sx={{ fontSize: `14px` }} />
                            </div>

                            <div>{facet.title + ""}</div>
                            <div
                                style={{
                                    margin: `2.5px 2px 0px 2px`,
                                }}
                            >
                                <DoubleArrowIcon sx={{ fontSize: `14px` }} />
                            </div>

                            <div>{keyword.title + ""}</div>
                        </div> */}
                    </ListSubheader>
                }
            >
                {suggestQuestionsForThisContainer &&
                suggestQuestionsForThisContainer.length ? (
                    suggestQuestionsForThisContainer.map((sq) => {
                        return (
                            <React.Fragment key={nanoid()}>
                                <Question
                                    find={find}
                                    suggestQuestion={sq}
                                    container={container}
                                    key={nanoid()}
                                    onClickQuestion={handleClickQuestion}
                                    handleDeleteSuggestQuestion={
                                        handleDeleteSuggestQuestion
                                    }
                                />
                            </React.Fragment>
                        );
                    })
                ) : (
                    <ListItemButton sx={{ textAlign: `center` }}>
                        {/* <ListItemIcon>
                        <QuizIcon />
                    </ListItemIcon> */}
                        {isLoading ? (
                            <ListItemText
                                primary={<LinearWithValueLabel />}
                                sx={{
                                    borderBottom: `1px solid black`,
                                    paddingBottom: `5px`,
                                    borderTop: `1px solid black`,
                                    paddingTop: `5px`,
                                }}
                            />
                        ) : (
                            <ListItemText
                                primary={"No data..."}
                                sx={{
                                    borderBottom: `1px solid black`,
                                    paddingBottom: `5px`,
                                    borderTop: `1px solid black`,
                                    paddingTop: `5px`,
                                }}
                            />
                        )}
                    </ListItemButton>
                )}

                <CloseMenu
                    onClose={handleCloseContainer}
                    onGetSuggestQuestions={handleGetSuggestQuestions}
                    onGetQuestions={handleGetQuestions}
                    onClearSuggestQuestions={handleClearSuggestQuestions}
                    onGenerateSuggestQuestions={handleGenerateSuggestQuestions}
                    handleCustomQuestion={handleCustomQuestion}
                    onCloseMenu={handleClose}
                    open={open}
                    anchorEl={anchorEl}
                />
            </List>
            {currentSuggestQuestion && (
                <QuestionProcessingModal
                    currentSuggestQuestion={currentSuggestQuestion}
                    onClickQuestion={handleClickQuestion}
                    handleChangeQuestionState={handleChangeQuestionState}
                    find={find}
                />
            )}

            <AlertDialogSlide
                openDialog={openDialogForDeletingSuggestedQuestion}
                headingText={"WARNING"}
                headingTextColor={"#face30"}
                contentBody={`Do you really want to delete it?`}
                paragraph={"Click continue to delete this question."}
                onClickOpenAlertDialogSlide={() => {}}
                onClickCloseAlertDialogSlide={handleClickCloseAlertDialogSlide}
                addFacetToFacetCardSuccess={() =>
                    handleDeleteSuggestQuestionSuccess()
                }
            />
        </div>
    );
}
