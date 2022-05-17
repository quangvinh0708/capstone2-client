import React, { Component, Fragment, useState } from "react";
import { render } from "react-dom";
import SortableTree from "react-sortable-tree";
import Dashboard from "../../Dashboard";
import { useStyles } from "./styles";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import { IRootState } from "../../../../../Redux/Store/Reducers/combineReducers";
import { useDispatch, useSelector } from "react-redux";
import CircularLoading from "./Common/Loading/CircularLoading";
import Xarrow from "react-xarrows";
import { mainTreeHandle } from "../../../../../Redux/Features/MainTreeHandle/actions";

// import { SortableTreeWithoutDndContext as SortableTree } from "react-sortable-tree";
export default function Tree({
    classNameForTree,
    classNameForTreeContainer,
    data: treeData,
    onChange,
    circularLoadingProps,
    result,
    start,
    end,
}: any) {
    const classes = useStyles();
    console.log("Treeeeeeeeeeeeeeeeeeeeeeeeeeeeeee Render");

    const dispatch = useDispatch();

    const keywordSelected = useSelector(
        (state: IRootState) => state.mainTreeHandle.keywordSelected
    );

    const handleChangeTreeData = (data) => {
        onChange(data);
    };

    return (
        <div>
            <div
                className={classNameForTreeContainer}
                key={keywordSelected[0]?.id}
                id={end ? end : ""}
            >
                <SortableTree
                    isVirtualized={false}
                    treeData={treeData}
                    // canDrag={false}
                    onChange={handleChangeTreeData}
                    // shouldCopyOnOutsideDrop={true}
                    // searchMethod={(x) => {
                    //     console.log("xY", x);
                    // }}
                    onVisibilityToggle={(data) => {
                        dispatch(
                            mainTreeHandle.filterKeywordSelected.request(data)
                        );
                    }}
                    className={classNameForTree}
                    // style={{ margin: 0, padding: 0 }}
                />

                {/* <Fragment>{circularLoadingProps}</Fragment> */}
            </div>
            {end ? (
                <Xarrow
                    start={start}
                    end={end}
                    path={"grid"}
                    showHead={true}
                    // labels="Related"
                    animateDrawing={true}
                    // dashness={true}
                    startAnchor={"bottom"}
                    endAnchor={"top"}
                    zIndex={800}
                    strokeWidth={2}
                />
            ) : (
                void 0
            )}
        </div>
    );
}
