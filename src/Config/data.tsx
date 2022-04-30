import { nanoid } from "nanoid";

export interface Facet {
    id: string;
    label: string;
    children: string[];
    isExpanding: boolean;
}

export const facet: Facet[] = [
    {
        id: nanoid(),
        label: "Openness",
        isExpanding: false,
        children: [
            "Ideas",
            "Fantasy",
            "Aesthetics",
            "Actions",
            "Feelings",
            "Values",
        ],
    },
    {
        id: nanoid(),
        label: "Neuroticism",
        isExpanding: false,

        children: [
            "Anxiety",
            "Angry Hostility",
            "Depression",
            "Self-consciousness",
            "Impulsiveness",
            "Vulnerability",
        ],
    },
    {
        id: nanoid(),
        isExpanding: false,
        label: "Conscientiousness",
        children: [
            "Competence",
            "Order",
            "Dutifulness",
            "Achievement striving",
            "Self-discipline",
            "Deliberation",
        ],
    },
    {
        id: nanoid(),
        isExpanding: false,
        label: "Agreeableness",
        children: [
            "Trust",
            "Straightforwardness",
            "Altruism",
            "Compliance",
            "Modesty",
            "Tender-mindedness",
        ],
    },
    {
        id: nanoid(),
        isExpanding: false,
        label: "Extraversion",
        children: [
            "Gregariousness",
            "Assertiveness",
            "Activity",
            "Excitement-seeking",
            "Positive emotions",
            "Warmth",
        ],
    },
];

export interface Keyword {
    id: string;
    label: string;
    children?: SubKeyword[];
    isExpanding?: boolean;
}

export interface SubKeyword {
    id: string;
    label: string;
    children?: any[];
    isExpanding?: boolean;
}

export const keywords: Keyword[] = [
    {
        id: nanoid(),
        label: "Food",
        isExpanding: false,
        children: [
            { label: "Food Fruit", id: nanoid() },
            { label: "Food Meat", id: nanoid() },
            { label: "Smoke", id: nanoid() },
            { label: "Rice Field", id: nanoid() },
            {
                id: nanoid(),
                label: "Food Salack",
                isExpanding: false,
                children: [
                    {
                        id: nanoid(),
                        label: "Food Salack 1",
                        isExpanding: false,
                        children: [{ label: "Food Salack 1 1", id: nanoid() }],
                    },
                ],
            },
        ],
    },
    {
        id: nanoid(),
        label: "Water",
        isExpanding: false,
        children: [
            { label: "Water Fruit", id: nanoid() },
            { label: "Water Meat", id: nanoid() },
            {
                label: "Water Salack",
                id: nanoid(),
                isExpanding: false,
                children: [{ label: "Water Salack 1", id: nanoid() }],
            },
        ],
    },
    {
        id: nanoid(),
        label: "Water",
        isExpanding: false,
        children: [
            { label: "Water Fruit", id: nanoid() },
            { label: "Water Meat", id: nanoid() },
            {
                label: "Water Salack",
                id: nanoid(),
                isExpanding: false,
                children: [{ label: "Water Salack 1", id: nanoid() }],
            },
        ],
    },
];
