import React, { Fragment, useState } from "react";
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
} from "../../../../../../Redux/Features/MainTreeHandle/reducer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useDispatch } from "react-redux";
import { mainTreeHandle } from "../../../../../../Redux/Features/MainTreeHandle/actions";
import QuestionProcessingModal from "../../../../../Commons/QuestionProcessingModal/QuestionProcessingModal";
type Props = {
    suggestQuestion: QuestionType;
    onClickQuestion: Function;
    container: Container;
};

const Question = ({ suggestQuestion, onClickQuestion, container }: Props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const dispatch = useDispatch();

    const handleOpenQuestionProcessingModal = () => {
        console.log("suggestQuestion", suggestQuestion, container);
        onClickQuestion({ ...suggestQuestion, ...container });
        dispatch(mainTreeHandle.openQuestionProcessingModal.success(true));
    };

    return (
        <Fragment>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    // Option CSS 1
                    // "&:hover .quiz--icon": {
                    //     color: `#6495ED`,
                    // },
                    // "&:hover .expand--less, &:hover .expand--more": {
                    //     color: `#00b2dd`,
                    // },

                    // Option CSS 2
                    "&:hover .quiz--icon": {
                        color: `#FFF`,
                    },
                    "&:hover": {
                        background: `#6495ED`,
                    },
                    "&:hover .expand--less, &:hover .expand--more": {
                        color: `#FFF`,
                    },
                    "&:hover .question--text": {
                        color: `#FFF`,
                    },
                }}
            >
                <ListItemIcon>
                    <QuizIcon className="quiz--icon" />
                </ListItemIcon>
                <ListItemText
                    className="question--text"
                    primary={suggestQuestion.question}
                />
                {open ? (
                    <ExpandLess className="expand--less" />
                ) : (
                    <ExpandMore className="expand--more" />
                )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={
                        {
                            // "&:hover .handyman--icon": {
                            //     color: `#6495ED`,
                            // },
                            // "&:hover .deleteforever--icon": {
                            //     color: `#6495ED`,
                            // },
                        }
                    }
                >
                    <ListItemButton
                        sx={{
                            pl: 4,
                            "&:hover .handyman--icon": {
                                color: `#6495ED`,
                            },
                        }}
                        onClick={handleOpenQuestionProcessingModal}
                    >
                        <ListItemIcon>
                            <HandymanIcon className="handyman--icon" />
                        </ListItemIcon>
                        <ListItemText primary="Handle" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            pl: 4,
                            "&:hover .deleteforever--icon": {
                                color: `#6495ED`,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <DeleteForeverIcon className="deleteforever--icon" />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItemButton>
                </List>
            </Collapse>
        </Fragment>
    );
};

export default Question;
