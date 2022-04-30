import React, { ReactElement } from "react";

type Props = {
    children?: ReactElement;
    id: string;
    className?: string;
};

const Board = (props: Props) => {
    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData("card_id");

        const card: HTMLElement | null = document.getElementById(card_id);
        card!.style.display = "block";

        e.target.appendChild(card);
    };

    const dragOver = (e) => {
        e.preventDefault();
    };
    return (
        <div
            id={props.id}
            onDrop={drop}
            onDragOver={dragOver}
            className={props.className}
        >
            {props.children}
        </div>
    );
};

export default Board;
