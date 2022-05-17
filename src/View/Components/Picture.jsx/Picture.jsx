import React from "react";
import { useDrag } from "react-dnd";
import "../../../App.css";

const Picture = ({ id, url, ...props }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: id, url: url },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <img
            {...props}
            ref={drag}
            src={url}
            id={id}
            alt={url + id}
            style={{ border: isDragging ? "5px solid pink" : "0px" }}
        />
    );
};

export default Picture;
