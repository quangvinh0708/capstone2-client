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

    const handleClickQuestion = (question) => {
        setCurrentSuggestQuestion(question);
    };

    const suggestQuestions = useSelector(
        (state: IRootState) => state.mainTreeHandle.suggestQuestions
    );

    const suggestQuestionsForThisContainer = suggestQuestions.find(
        (sq) => sq.keyword.id === keyword.id
    )?.questions;

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

    return (
        <React.Fragment>
            <List
                id={id}
                sx={{
                    width: "100%",
                    maxWidth: `48%`,
                    bgcolor: "background.paper",
                    marginTop: `20px`,
                    border: `1px solid black`,
                    borderRadius: `7px`,
                    position: `relative`,
                    marginRight: `5px`,
                    marginBottom: `8px`,
                }}
                className={classes.questionList}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            textAlign: `center`,
                            fontWeight: `bold`,
                            textTransform: `uppercase`,
                            background: `cornflowerblue`,
                            color: "#FFFFFF",
                            "&:hover": {
                                backgroundImage: `linear-gradient(45deg, cornflowerblue 15%, #00d4ff 75%) !important`,
                                color: `#FFFFFF`,
                            },
                            cursor: `pointer`,
                        }}
                        onClick={(e) => handleClick(e)}
                    >
                        {keyword.label + " -- " + facet.label}
                    </ListSubheader>
                }
            >
                {suggestQuestionsForThisContainer &&
                suggestQuestionsForThisContainer.length ? (
                    suggestQuestionsForThisContainer.map((sq) => {
                        return (
                            <React.Fragment key={nanoid()}>
                                <Question
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
                {/* <ListItemButton>
                    <ListItemIcon>
                        <QuizIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <QuizIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                        </ListItemButton> */}

                <CloseMenu
                    onClose={handleCloseContainer}
                    onGetSuggestQuestions={handleGetSuggestQuestions}
                    onClearSuggestQuestions={handleClearSuggestQuestions}
                    onCloseMenu={handleClose}
                    open={open}
                    anchorEl={anchorEl}
                />
            </List>
            {currentSuggestQuestion && (
                <QuestionProcessingModal
                    currentSuggestQuestion={currentSuggestQuestion}
                    onClickQuestion={handleClickQuestion}
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
        </React.Fragment>
    );
}
