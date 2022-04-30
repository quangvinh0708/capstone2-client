import { Card, CardContent, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import React, { Fragment } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Keyword } from "../../../../../Config/data";
import { mainTreeHandle } from "../../../../../Redux/Features/MainTreeHandle/actions";
import { IRootState } from "../../../../../Redux/Store/Reducers/combineReducers";
import MenuOption from "../../../../Commons/MenuOption/MenuOption";
import { useStyles } from "./styles";
import Xarrow from "react-xarrows";

type Props = {
    className?: string;
    id?: string;
    keywordSelected: Keyword[];
    start: string;
};

const KeywordCard = ({ className, id, keywordSelected, start }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "keyword",
        drop: (item) => addKeywordToKeywordCard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addKeywordToKeywordCard = (keyword) => {
        dispatch(mainTreeHandle.addKeywordSelected.request(keyword));
    };

    const handleDeleteKeywordSelected = (keyword) => {
        dispatch(mainTreeHandle.deleteKeywordSelected.success(keyword));
    };

    const handleAddToListContainer = (keyword) => {
        dispatch(mainTreeHandle.addListContainer.request(keyword));
    };

    return (
        <Fragment>
            <Card
                className={
                    classes.keywordCard + " " + (className ? className : "")
                }
                sx={{
                    margin: `70px 0 0 0`,
                    // float: `left`,
                    // marginLeft: `25%`,
                }}
                ref={drop}
                id={id ? id : ""}
            >
                <CardContent
                    sx={{ display: `flex`, justifyContent: `space-between` }}
                >
                    {keywordSelected.length > 0 ? (
                        keywordSelected.map((keyword) => {
                            const x = nanoid();
                            return (
                                <Fragment>
                                    <MenuOption
                                        key={keyword.id}
                                        stateSelected={keywordSelected}
                                        onDelete={() =>
                                            handleDeleteKeywordSelected(keyword)
                                        }
                                        id={x}
                                        keywordId={keyword.id}
                                        onAdd={() =>
                                            handleAddToListContainer(keyword)
                                        }
                                        children={
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
                                                <span>{keyword.label}</span>
                                            </Typography>
                                        }
                                    />
                                    <Xarrow
                                        start={start}
                                        end={x}
                                        path={"grid"}
                                        showHead={false}
                                        // labels="Related"
                                        animateDrawing={true}
                                        // dashness={true}
                                        startAnchor={"bottom"}
                                        endAnchor={"top"}
                                        zIndex={800}
                                        strokeWidth={4}
                                    />
                                </Fragment>
                            );
                        })
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
                            <span>{"Move Keyword Here..."}</span>
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <div style={{ content: "", clear: `both`, display: `table` }}></div>
        </Fragment>
    );
};

export default KeywordCard;
