import React, { Component, Fragment, useState } from "react";
import { render } from "react-dom";
import SortableTree from "react-sortable-tree";
import Dashboard from "../../Dashboard";
import Tree from "./Tree";
import { useStyles } from "./styles";
import { IRootState } from "../../../../../Redux/Store/Reducers/combineReducers";
import { useDispatch, useSelector } from "react-redux";
import { facetTree } from "../../../../../Redux/Features/FacetTree/actions";
import { keywordTree } from "../../../../../Redux/Features/KeywordTree/actions";
import { useDrag, useDrop } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import { nanoid } from "nanoid";
import List from "./List";

export default function ReactSortableTree() {
    const classes = useStyles();

    const facet = useSelector((state: IRootState) => state.facetTree.facet);
    const keywords = useSelector(
        (state: IRootState) => state.keywordTree.keywords
    );

    const dispatch = useDispatch();

    const handleChangeFacet = (data) => {
        dispatch(facetTree.getFacets.success(data));
    };

    const handleChangeKeyword = (data) => {
        dispatch(keywordTree.getKeywords.success(data));
    };

    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: "facet",
    //     item: { a: "A" },
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));

    // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: "facet",
    //     drop: (item) => {},
    //     collect: (monitor) => ({
    //         isOver: !!monitor.isOver(),
    //     }),
    // }));

    const test = (result) => {
        if (!result.destination) return;

        console.log("result ne", result);
    };

    return (
        <Fragment>
            <div
                style={{
                    display: `flex`,
                    justifyContent: "space-between",
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* <List /> */}
                <DragDropContext onDragEnd={(result) => test(result)}>
                    {/* <Droppable droppableId={nanoid()} key={nanoid()}>
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver
                                            ? "lightblue"
                                            : "lightgrey",
                                        padding: 4,
                                        width: 250,
                                        minHeight: 500,
                                    }}
                                >
                                    {provided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable> */}
                    <Tree
                        classNameForTreeContainer={classes.facetTree}
                        classNameForTree={classes.facetSortableTree}
                        data={facet}
                        onChange={handleChangeFacet}
                    />
                    <Tree
                        classNameForTreeContainer={classes.keywordTree}
                        classNameForTree={classes.keywordSortableTree}
                        data={keywords}
                        onChange={handleChangeKeyword}
                    />
                </DragDropContext>
            </div>
        </Fragment>
    );
}
