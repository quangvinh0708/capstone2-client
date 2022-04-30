import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../Redux/Store/Reducers/combineReducers";
import { mainTreeHandle } from "../../../Redux/Features/MainTreeHandle/actions";
import { useStyles } from "./styles";
import BasicSelect from "./../Select/BasicSelect";
import { BIG5_TRAIT, TraitLevel } from "../../../Utils/trait";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
    props,
    ref
) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: `500px`,
    // boxSizing: `border-box`,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: `15px`,
};

export default function QuestionProcessingModal({
    currentSuggestQuestion,
    onClickQuestion,
}) {
    const open = useSelector(
        (state: IRootState) =>
            state.mainTreeHandle.isQuestionProcessingModalOpen
    );

    const paramState = [
        {
            Openness:
                currentSuggestQuestion?.facet?.parent.label === "Openness"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Conciencetious:
                currentSuggestQuestion?.facet?.parent.label === "Conciencetious"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Extraversion:
                currentSuggestQuestion?.facet?.parent.label === "Extraversion"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Agreeable:
                currentSuggestQuestion?.facet?.parent.label === "Agreeable"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
        {
            Neuroticism:
                currentSuggestQuestion?.facet?.parent.label === "Neuroticism"
                    ? TraitLevel.HIGH
                    : TraitLevel.LOW,
        },
    ];

    const [personalities, setPersonalities] = React.useState<any>(paramState);

    console.log("personality", personalities);

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleCloseSuggestQuestionModal = () => {
        setPersonalities(paramState);
        handleClose();
    };

    const handleChangePersonalityLevel = (personality, level) => {
        const x = personalities.find((p) => {
            return Object.values(p).includes("High");
        });
        if (x && level === "High") {
            toast.error("One question only has one HIGH level");
            return;
        }

        setPersonalities((pArr) =>
            pArr.map((p) => {
                const key = Object.keys(p)[0];
                if (key === personality) {
                    return {
                        ...p,
                        [personality]: level,
                    };
                } else return p;
            })
        );
    };

    const handleClose = () =>
        dispatch(mainTreeHandle.openQuestionProcessingModal.success(false));

    return (
        <div>
            {currentSuggestQuestion !== undefined && (
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    open={open}
                    onClose={handleCloseSuggestQuestionModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 200,
                    }}
                    className={classes.suggestQuestionModal}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography
                                id="spring-modal-title"
                                variant="h5"
                                component="h2"
                                sx={{
                                    borderBottom: `2px solid #a0a0a0`,
                                    paddingBottom: `15px`,
                                }}
                            >
                                Suggested Question
                            </Typography>
                            <Box className={classes.evaluateBox}>
                                {personalities.map((p) => {
                                    const key = Object.keys(p)[0];
                                    console.log("key", key);
                                    return (
                                        <Box
                                            className={classes.traitBox}
                                            key={nanoid()}
                                        >
                                            <Typography
                                                component="p"
                                                className={classes.traitLabel}
                                                sx={{
                                                    fontSize: `18px`,
                                                    fontWeight: `500`,
                                                }}
                                            >
                                                {key}
                                            </Typography>
                                            <BasicSelect
                                                personality={key}
                                                p={p}
                                                handleChangePersonalityLevel={
                                                    handleChangePersonalityLevel
                                                }
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Typography
                                id="spring-modal-description"
                                sx={{ mt: 2 }}
                            >
                                {currentSuggestQuestion.question}
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            )}
        </div>
    );
}
