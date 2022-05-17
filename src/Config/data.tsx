import { Button } from "@mui/material";
import { nanoid } from "nanoid";
import { ReactElement } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
export interface TreeData {
    title: string | ReactElement;
    subtitle?: string;
    id: string;
    children?: (TreeData | string)[];
    expanded?: boolean;
    [index: string]:
        | string
        | ReactElement
        | boolean
        | undefined
        | (TreeData | string)[];
}

export const facet: TreeData[] = [
    {
        id: nanoid(),
        title: "Openness",
        expanded: false,
        children: [
            { title: "Ideas", id: nanoid() },
            { title: "Fantasy", id: nanoid() },
            { title: "Aesthetics", id: nanoid() },
            { title: "Actions", id: nanoid() },
            { title: "Feelings", id: nanoid() },
            { title: "Values", id: nanoid() },
        ],
    },
    {
        id: nanoid(),
        title: "Neuroticism",
        expanded: false,
        children: [
            { title: "Anxiety", id: nanoid() },
            { title: "Angry Hostility", id: nanoid() },
            { title: "Depression", id: nanoid() },
            { title: "Self-consciousness", id: nanoid() },
            { title: "Impulsiveness", id: nanoid() },
            { title: "Vulnerability", id: nanoid() },
        ],
    },
    {
        id: nanoid(),
        expanded: false,
        title: "Conscientiousness",
        children: [
            { title: "Competence", id: nanoid() },
            { title: "Order", id: nanoid() },
            { title: "Dutifulness", id: nanoid() },
            { title: "Achievement striving", id: nanoid() },
            { title: "Self-discipline", id: nanoid() },
            { title: "Deliberation", id: nanoid() },
        ],
    },
    {
        id: nanoid(),
        expanded: false,
        title: "Agreeableness",
        children: [
            { title: "Trust", id: nanoid() },
            { title: "Straightforwardness", id: nanoid() },
            { title: "Altruism", id: nanoid() },
            { title: "Compliance", id: nanoid() },
            { title: "Modesty", id: nanoid() },
            { title: "Tender-mindedness", id: nanoid() },
        ],
    },
    {
        id: nanoid(),
        expanded: false,
        title: "Extraversion",
        children: [
            { title: "Gregariousness", id: nanoid() },
            { title: "Assertiveness", id: nanoid() },
            { title: "Activity", id: nanoid() },
            { title: "Excitement-seeking", id: nanoid() },
            { title: "Positive emotions", id: nanoid() },
            { title: "Warmth", id: nanoid() },
        ],
    },
];

export const keywords: TreeData[] = [
    {
        id: nanoid(),
        title: "Food",
        expanded: false,
        children: [
            { title: "Food Fruit", id: nanoid(), expanded: false },
            { title: "Food Meat", id: nanoid(), expanded: false },
            { title: "Smoke", id: nanoid(), expanded: false },
            { title: "Rice Field", id: nanoid(), expanded: false },
            {
                id: nanoid(),
                title: "Food Salack",
                expanded: false,
                children: [
                    {
                        id: nanoid(),
                        title: "Food Salack 1",
                        expanded: false,
                        children: [
                            {
                                title: "Food Salack 1 1",
                                id: nanoid(),
                                expanded: false,
                            },
                        ],
                    },
                    {
                        id: nanoid(),
                        title: "Food Salack 2",
                    },
                    {
                        id: nanoid(),
                        title: "Food Salack 3",
                    },
                ],
            },
        ],
    },
    {
        id: nanoid(),
        title: "Water",
        expanded: false,
        children: [
            { title: "Water Fruit", id: nanoid() },
            { title: "Water Meat", id: nanoid() },
            {
                title: "Water Salack",
                id: nanoid(),
                expanded: false,
                children: [{ title: "Water Salack 1", id: nanoid() }],
            },
        ],
    },
    {
        id: nanoid(),
        title: "Water",
        expanded: false,
        children: [
            { title: "Water Fruit", id: nanoid() },
            { title: "Water Meat", id: nanoid() },
            {
                title: "Water Salack",
                id: nanoid(),
                expanded: false,
                children: [{ title: "Water Salack 1", id: nanoid() }],
            },
        ],
    },
];

export const ConvertToTitleTSX = ({ f, i }) => {
    return (
        <Droppable droppableId={nanoid()}>
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
                        <Draggable
                            key={nanoid()}
                            draggableId={nanoid()}
                            index={0}
                        >
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

export const convertTreeDataToTreeDataTSX = (keywords) => {
    keywords.forEach((f, i) => {
        f.title = ConvertToTitleTSX({ f, i });
        if (f.children && f.children?.length) {
            convertTreeDataToTreeDataTSX(f.children);
        }
    });
};

// convertTreeDataToTreeDataTSX(keywords);
// convertTreeDataToTreeDataTSX(facet);

export const keywords1 = keywords;
export const facet1 = facet;
