import React, { useState } from "react";
import { Tree, NodeModel } from "@minoru/react-dnd-treeview";
import { Button } from "@mui/material";
import { IRootState } from "../../../../../Redux/Store/Reducers/combineReducers";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
// import "./App.css";

export default function Tree1({ treeData }) {
    // const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);

    const dispatch = useSelector((state: IRootState) => undefined);

    return (
        <div className="app">
            <Tree
                tree={treeData}
                rootId={0}
                render={(node, { depth, isOpen, onToggle }) => (
                    <div style={{ marginInlineStart: depth * 10 }}>
                        {node.droppable && (
                            <Button onClick={onToggle}>
                                {isOpen ? "[-]" : "[+]"}
                            </Button>
                        )}
                        <Button>{node.text}</Button>
                    </div>
                )}
                dragPreviewRender={(monitorProps) => (
                    <div>{monitorProps.item.text}</div>
                )}
                // onDrop={handleDrop}
                onDrop={() => {}}
            />
        </div>
    );
}
