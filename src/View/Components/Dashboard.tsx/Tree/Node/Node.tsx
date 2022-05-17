// import { nanoid } from "nanoid";
// import React from "react";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import { addBoxIcon } from "../style";
// import { useDrag } from "react-dnd";
// import style from "./node.module.scss";
// import { Facet } from "../../../../../Config/data";

// type Props = {
//     child: string;
//     id: string;
//     parent: Facet;
// };

// const Node = ({ child, id, parent }: Props) => {
//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: "facet",
//         item: { id: id, label: child, parent },
//         collect: (monitor) => ({
//             isDragging: !!monitor.isDragging(),
//         }),
//     }));
//     return (
//         <li ref={drag} className={isDragging ? style.gradientBorder : ""}>
//             <FolderOpenIcon
//                 sx={{
//                     ...addBoxIcon,
//                     fontSize: `12px`,
//                     marginRight: `5px`,
//                 }}
//                 color={"error"}
//             />
//             {child}
//         </li>
//     );
// };

// export default Node;
export {};
