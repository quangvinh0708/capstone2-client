import { Button } from "@mui/material";
import { useDrag } from "react-dnd";
import { createReducer } from "typesafe-actions";
import { TreeData, keywords, keywords1 } from "../../../Config/data";
import { keywordTree } from "./actions";
import { Droppable, Draggable } from "react-beautiful-dnd";

export interface KeywordTreeState {
    keywords: TreeData[];
}

export const ConvertToTitleTSX = ({ f, i }) => {
    return (
        <Droppable droppableId={f.id}>
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
                                    <button
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {f.title}
                                    </button>
                                );
                            }}
                        </Draggable>

                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
};

// convertTreeDataToTreeDataTSX(keywords, ConvertToTitleTSX);

export const convertTreeDataToTreeDataTSX = (
    keywords,
    TitleTSXConvertFunction
) => {
    keywords.forEach((f, i) => {
        f.title = <TitleTSXConvertFunction f={f} i={i} />;
        if (f.children && f.children?.length) {
            convertTreeDataToTreeDataTSX(f.children, TitleTSXConvertFunction);
        }
    });
};

// convertTreeDataToTreeDataTSX(keywords, ConvertToTitleTSX);

const initialState: KeywordTreeState = {
    keywords: [],
};

const keywordTreeReducer = () =>
    createReducer(initialState)
        /* ------------- usersAsync ------------- */
        .handleAction(keywordTree.getKeywords.request, (state) => ({
            ...state,
        }))
        .handleAction(keywordTree.getKeywords.success, (state, action) => ({
            ...state,
            keywords: action.payload,
        }))
        .handleAction(keywordTree.getKeywords.failure, (state, action) => ({
            ...state,
        }));
export default keywordTreeReducer;
