import { Button } from "@mui/material";
import { createReducer } from "typesafe-actions";
import { facet, TreeData, facet1 } from "../../../Config/data";
import { facetTree } from "./actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";

export interface FacetTreeState {
    facet: TreeData[];
}

export const ConvertToTitleTSX = ({ f, i }) => {
    return (
        <Droppable droppableId={f.id} key={nanoid()}>
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        // style={{
                        //     background: snapshot.isDraggingOver
                        //         ? "lightblue"
                        //         : "lightgrey",
                        //     padding: 4,
                        //     width: 250,
                        //     minHeight: 500,
                        // }}
                    >
                        <Draggable key={f.id} draggableId={f.id} index={i}>
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ color: `black !important` }}
                                    >
                                        <button
                                            style={{
                                                color: `black !important`,
                                            }}
                                        >
                                            {f.title}A
                                        </button>
                                    </div>
                                );
                            }}
                        </Draggable>
                        A{/* {provided.placeholder} */}
                    </div>
                );
            }}
        </Droppable>
    );
};

export const convertTreeDataToTreeDataTSX = (keywords, parent) => {
    keywords.forEach((f, i) => {
        f.facet = true;
        if (!f.children || !f.children?.length) {
            f.parentId = parent.id;
            f.parentTitle = parent.title;
        }
        if (f.children && f.children?.length) {
            parent = f;
            convertTreeDataToTreeDataTSX(f.children, parent);
        }
    });
};

convertTreeDataToTreeDataTSX(facet, null);

const initialState = {
    facet: [],
};

const facetTreeReducer = () =>
    createReducer(initialState)
        /* ------------- usersAsync ------------- */
        .handleAction(facetTree.getFacets.request, (state) => ({
            ...state,
        }))
        .handleAction(facetTree.getFacets.success, (state, action) => {
            convertTreeDataToTreeDataTSX(action.payload, null);

            return {
                ...state,
                facet: action.payload,
            };
        })
        .handleAction(facetTree.getFacets.failure, (state, action) => ({
            ...state,
        }));
export default facetTreeReducer;
