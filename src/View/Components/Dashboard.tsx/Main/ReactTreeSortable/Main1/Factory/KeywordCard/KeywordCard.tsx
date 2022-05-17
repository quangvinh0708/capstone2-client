import { Button, Card, CardContent, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import React, { Fragment } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styles";
import Xarrow from "react-xarrows";
import { TreeData } from "../../../../../../../../Config/data";
import { mainTreeHandle } from "../../../../../../../../Redux/Features/MainTreeHandle/actions";
import CloseIcon from "@mui/icons-material/Close";
import MenuOptionPopup from "../../../Common/MenuOptionPopup";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Droppable } from "react-beautiful-dnd";
import Tree from "../../../Tree";
import { IRootState } from "../../../../../../../../Redux/Store/Reducers/combineReducers";
import { facetTree } from "../../../../../../../../Redux/Features/FacetTree/actions";
import style from "../../node.module.scss";
import CircularLoading from "../../../Common/Loading/CircularLoading";

type Props = {
    className?: string;
    id?: string;
    keywordSelected: TreeData[];
    start: string;
    keywordCardDroppableId: any;
};

const KeywordCard = ({
    className,
    id,
    keywordSelected,
    start,
    keywordCardDroppableId,
}: Props) => {
    const classes = useStyles();
    const openCircularLoading = useSelector(
        (state: IRootState) => state.mainTreeHandle.openCircularLoading
    );

    const dispatch = useDispatch();

    const addKeywordToKeywordCardRequest = (keyword) => {
        dispatch(mainTreeHandle.addKeywordSelected.request(keyword));
    };

    const handleDeleteKeywordSelected = (keyword) => {
        dispatch(mainTreeHandle.deleteKeywordSelected.success(keyword));
    };

    const handleAddToListContainer = (keyword) => {
        dispatch(mainTreeHandle.addListContainer.request(keyword));
    };

    const handleChangeFacetTree = (data, i) => {
        dispatch(mainTreeHandle.updateKeywordSelected.success({ data, i }));
    };

    return (
        <Fragment>
            <Droppable droppableId={keywordCardDroppableId}>
                {(provided, snapshot) => {
                    return (
                        <div>
                            <Card
                                className={
                                    classes.keywordCard +
                                    " " +
                                    (className ? className : "")
                                    // +
                                    // " " +
                                    // (snapshot.isDraggingOver
                                    //     ? style.gradientBorder
                                    //     : "")
                                }
                                sx={{
                                    margin: `70px 0 0 0`,
                                    // float: `left`,
                                    // marginLeft: `25%`,
                                    background:
                                        snapshot.isDraggingOver &&
                                        "linear-gradient(45deg, rgba(100, 149, 237, 0.5), rgba(100, 149, 237, 0.3))",
                                }}
                                id={id ? id : ""}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <CardContent
                                    sx={{
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        // overflow: `auto`,
                                        padding: !(keywordSelected.length > 0)
                                            ? `16px !important`
                                            : `0px !important`,
                                    }}
                                >
                                    {keywordSelected.length > 0 ? (
                                        keywordSelected.map(
                                            (keyword: TreeData, i: number) => {
                                                const x = nanoid();
                                                const { index, isOpen } =
                                                    openCircularLoading;

                                                const result =
                                                    index === i && isOpen;

                                                return (
                                                    <Fragment key={x}>
                                                        <Tree
                                                            classNameForTreeContainer={
                                                                classes.keywordTree
                                                            }
                                                            classNameForTree={
                                                                classes.keywordSortableTree
                                                            }
                                                            data={keyword}
                                                            start={start}
                                                            end={x}
                                                            onChange={(data) =>
                                                                handleChangeFacetTree(
                                                                    data,
                                                                    i
                                                                )
                                                            }
                                                            result={result}
                                                            // circularLoadingProps={
                                                            //     <CircularLoading
                                                            //         cssInline={{
                                                            //             position: `absolute`,
                                                            //             top: `20%`,
                                                            //             left: `50%`,
                                                            //             transform: `translate(-50%, -20%)`,
                                                            //             zIndex: -1,
                                                            //         }}
                                                            //     />
                                                            // }
                                                        />

                                                        {/* <Xarrow
                                                            start={start}
                                                            end={x}
                                                            path={"grid"}
                                                            showHead={true}
                                                            // labels="Related"
                                                            animateDrawing={
                                                                true
                                                            }
                                                            // dashness={true}
                                                            startAnchor={"top"}
                                                            endAnchor={"top"}
                                                            zIndex={800}
                                                            strokeWidth={4}
                                                        /> */}
                                                    </Fragment>
                                                );
                                            }
                                        )
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                fontSize: `16px`,
                                                fontWeight: "bold",
                                                cursor: `pointer`,
                                                display: `flex`,
                                                flexDirection: `column`,
                                            }}
                                            align={"center"}
                                        >
                                            <span>
                                                {"Move Keyword Here..."}
                                            </span>
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>

            <div style={{ content: "", clear: `both`, display: `table` }}></div>
        </Fragment>
    );
};

export default KeywordCard;
