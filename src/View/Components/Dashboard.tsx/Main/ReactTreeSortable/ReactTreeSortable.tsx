import React, { Component, useState } from "react";
import { render } from "react-dom";
import SortableTree from "react-sortable-tree";

export default function ReactSortableTree() {
    const [treeData, setTreeData] = useState([
        {
            title: (
                <button
                    onClick={() => {
                        console.log("ABC");
                    }}
                >
                    Chicken
                </button>
            ),
        },
        // {
        //     title: (
        //         <button
        //             onClick={() => {
        //                 console.log("ABC");
        //             }}
        //         >
        //             Chicken
        //         </button>
        //     ),
        //     expanded: true,
        //     //   subtitle: "ABCN",
        //     children: [
        //         { title: "Egg", expanded: true, children: [{ title: "Egg1" }] },
        //     ],
        // },
    ]);

    return (
        <div style={{ height: `500px`, minHeight: `400px` }}>
            <SortableTree
                treeData={treeData}
                // canDrag={false}
                onChange={(treeData) => {
                    console.log("treeData", treeData);
                    setTreeData(treeData);
                }}
                searchMethod={(x) => {
                    console.log("x", x);
                }}
            />
        </div>
    );
}
