import React, { useState } from "react";
import { Tree, NodeModel } from "@minoru/react-dnd-treeview";
import { Button } from "@mui/material";
// import "./App.css";

export default function List() {
    const [treeData, setTreeData] = useState<NodeModel[]>([
        {
            id: "A",
            parent: 0,
            droppable: true,
            text: "Folder 1",
        },
        {
            id: 2,
            parent: "A",
            droppable: false,
            text: "File 1-1",
        },
        {
            id: 3,
            parent: "A",
            droppable: false,
            text: "File 1-2",
        },
        {
            id: 4,
            parent: 0,
            droppable: true,
            text: "Folder 2",
        },
        {
            id: 5,
            parent: 4,
            droppable: true,
            text: "Folder 2-1",
        },
        {
            id: 6,
            parent: 5,
            droppable: false,
            text: "File 2-1-1",
        },
        {
            id: 7,
            parent: 0,
            droppable: false,
            text: "File 3",
        },
    ]);
    const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);

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
                onDrop={handleDrop}
            />
        </div>
    );
}
