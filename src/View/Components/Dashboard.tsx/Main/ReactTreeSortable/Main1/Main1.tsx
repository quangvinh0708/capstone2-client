import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../../../Redux/Store/Reducers/combineReducers";
import KeywordTree from "./KeywordTree";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import { useStyles } from "./styles";
import Factory from "./Factory/Factory";
import { parse, stringify } from "query-string";
import { useDispatch } from "react-redux";
import { mainTreeHandle } from "../../../../../../Redux/Features/MainTreeHandle/actions";
import Tree from "../Tree";
import { useStyles as s2 } from "./Factory/KeywordCard/styles";
import { facetTree } from "../../../../../../Redux/Features/FacetTree/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const facetDroppableId = nanoid();
const keywordDroppableId = nanoid();

const facetCardDroppableId = nanoid();
const keywordCardDroppableId = nanoid();

const Main1 = (props: Props) => {
    const classes = useStyles();
    const classes2 = s2();

    const dispatch = useDispatch();

    const facet = useSelector((state: IRootState) => state.facetTree.facet);
    const keywords = useSelector(
        (state: IRootState) => state.keywordTree.keywords
    );

    console.log("facet in component", facet);

    const handleDragEnd = (result) => {
        console.log("DONE", result);
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        const draggableInfo = parse(draggableId, { parseBooleans: true });
        console.log("draggableInfo", draggableInfo);
        if (
            result.destination.droppableId === facetCardDroppableId &&
            draggableInfo.facet
        ) {
            dispatch(mainTreeHandle.addFacetSelected.request(draggableInfo));
            dispatch(mainTreeHandle.setCurrentFacet.success(draggableInfo));
        } else if (
            result.destination.droppableId === keywordCardDroppableId &&
            !draggableInfo.facet
        ) {
            dispatch(mainTreeHandle.addKeywordSelected.request(draggableInfo));
        }
    };

    return (
        <Box
            sx={{
                // height: `100vh`,
                // overflow: `scroll`,
                display: `flex`,
                justifyContent: `space-between`,
                marginTop: `10px`,
                marginBottom: `20px`,
                overflow: `hidden`,
            }}
        >
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                <Droppable droppableId={facetDroppableId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={classes.facetTree}
                                style={{
                                    backgroundImage: snapshot.isDraggingOver
                                        ? "linear-gradient(90deg, rgba(100, 149, 237, 0.5), rgba(100, 149, 237, 0.3))"
                                        : "linear-gradient(#FFF, #FFF)",
                                }}
                            >
                                <Box
                                    sx={{
                                        // backgroundImage: `url(https://ak.picdn.net/shutterstock/videos/10205426/thumb/1.jpg)`,
                                        // backgroundRepeat: "no-repeat",
                                        // backgroundSize: `cover`,
                                        // backgroundPosition: `right center`,
                                        padding: 0,
                                        // width: `50px`,
                                        marginBottom: `7px`,
                                        backgroundImage: `linear-gradient(45deg, rgba(2, 136, 209, 0.5) 75%, rgba(2, 136, 209, 0.3) 25%)`,
                                    }}
                                >
                                    <Typography
                                        component={"span"}
                                        variant={"body2"}
                                        sx={{
                                            padding: `3px 0px !important`,
                                            fontWeight: `500 !important`,
                                            display: `block`,
                                            // fontSize: `16px`,
                                            marginLeft: `0.2px`,
                                            minWidth: `200px`,
                                            fontSize: `17px`,
                                            background: `rgba(0, 0, 0, 0.4) !important`,

                                            textAlign: `center`,
                                            borderRadius: `5px`,
                                            // fontFamily: `'Noto Sans', sans-serif !important`,
                                            color: `#FFF`,
                                        }}
                                    >
                                        Facet
                                    </Typography>
                                </Box>

                                {facet.length ? (
                                    <KeywordTree
                                        keywords={facet}
                                        provided={provided}
                                        snapshot={snapshot}
                                        parentCanDrag={false}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: `400px`,
                                            width: 200,
                                            position: `relative !important`,
                                            // top: 200,
                                            // left: -50,
                                            // transform: `translate(-20%, -50%)`,
                                        }}
                                    >
                                        <CircularProgress
                                            sx={{
                                                position: `absolute !important`,
                                                top: `40%`,
                                                left: `45%`,
                                                transform: `translate(-20%, -50%)`,
                                            }}
                                        />
                                    </Box>
                                )}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
                <Box
                    sx={{
                        // border: `5px solid #face30`,
                        minWidth: `1031px`,
                        background: `#FFF`,
                        // height: `800px`,
                        minHeight: `300px !important`,
                    }}
                >
                    <Factory
                        facetCardDroppableId={facetCardDroppableId}
                        keywordCardDroppableId={keywordCardDroppableId}
                    />
                </Box>
                {/* <Tree
                    classNameForTreeContainer={classes2.facetTree}
                    classNameForTree={classes2.facetSortableTree}
                    data={facet}
                    onChange={(data) => {
                        dispatch(facetTree.success(data));
                    }}
                /> */}
                <Droppable droppableId={keywordDroppableId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={classes.keywordTree}
                                style={{
                                    backgroundImage: snapshot.isDraggingOver
                                        ? "linear-gradient(90deg, rgba(100, 149, 237, 0.5), rgba(100, 149, 237, 0.3))"
                                        : "linear-gradient(#FFF, #FFF)",
                                    // width: 250,
                                    // marginRight: `-25px`,
                                    // minWidth: `120px`,
                                    // marginLeft: `15px`,
                                }}
                            >
                                <Box
                                    sx={{
                                        // backgroundImage: `url(https://ak.picdn.net/shutterstock/videos/10205426/thumb/1.jpg)`,
                                        // backgroundRepeat: "no-repeat",
                                        // backgroundSize: `cover`,
                                        // backgroundPosition: `right center`,
                                        padding: 0,
                                        backgroundImage: `linear-gradient(45deg, rgba(2, 136, 209, 0.5) 75%, rgba(2, 136, 209, 0.3) 25%)`,
                                        marginBottom: `7px`,
                                        display: `table`,
                                    }}
                                >
                                    <Typography
                                        component={"span"}
                                        variant={"body2"}
                                        sx={{
                                            padding: `3px 0px !important`,
                                            fontWeight: `500 !important`,
                                            display: `block`,
                                            // fontSize: `16px`,
                                            marginLeft: `0.2px`,
                                            minWidth: `200px`,
                                            fontSize: `17px`,
                                            background: `rgba(0, 0, 0, 0.4) !important`,

                                            textAlign: `center`,
                                            borderRadius: `5px`,
                                            color: `#FFF`,
                                            width: `100% !important`,
                                        }}
                                    >
                                        Keywords
                                    </Typography>
                                </Box>
                                {keywords.length ? (
                                    <KeywordTree
                                        keywords={keywords}
                                        provided={provided}
                                        snapshot={snapshot}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: `400px`,
                                            width: 200,

                                            position: `relative !important`,
                                            // top: 200,
                                            // left: -50,
                                            // transform: `translate(-20%, -50%)`,
                                        }}
                                    >
                                        <CircularProgress
                                            sx={{
                                                position: `absolute !important`,
                                                top: `40%`,
                                                left: `45%`,
                                                transform: `translate(-20%, -50%)`,
                                            }}
                                        />
                                    </Box>
                                )}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
            <ToastContainer />
        </Box>
    );
};

export default Main1;
