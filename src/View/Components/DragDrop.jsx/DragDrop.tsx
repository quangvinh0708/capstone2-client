// import { nanoid } from "nanoid";
// import React, { Fragment, useState } from "react";
// import { useDrop } from "react-dnd";
// import { PICTURE_HEIGHT, PICTURE_WIDTH } from "../../Commons/Picture/picture";
// import Picture from "../Picture.jsx/Picture";
// import { useStyles } from "./styles";

// const PictureList: { id: string; url: string }[] = [
//     {
//         id: nanoid(),
//         url: "https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/ctvkhoe/2021_09_10/pho-vong-3-tron-day-1m-nu-than-sexy-lo-cach-giam-can-soc.jpeg",
//     },
//     {
//         id: nanoid(),
//         url: "https://cdn.pixabay.com/photo/2021/03/12/16/24/sexy-girl-6089996_1280.jpg",
//     },
//     {
//         id: nanoid(),
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzXLSqc7V981O2olDQYeKHIWpiKHMmuX0mA&usqp=CAU",
//     },
// ];

// const faceset = [
//     {
//         id: nanoid(),
//         label: "Openness",
//         children: [
//             "Ideas",
//             "Fantasy",
//             "Aesthetics",
//             "Actions",
//             "Feelings",
//             "Values",
//         ],
//     },
//     {
//         id: nanoid(),
//         label: "Neuroticism",
//         children: [
//             "Anxiety",
//             "Angry Hostility",
//             "Depression",
//             "Self-consciousness",
//             "Impulsiveness",
//             "Vulnerability",
//         ],
//     },
//     {
//         id: nanoid(),
//         label: "Conscientiousness",
//         children: [
//             "Competence",
//             "Order",
//             "Dutifulness",
//             "Achievement striving",
//             "Self-discipline",
//             "Deliberation",
//         ],
//     },
//     {
//         id: nanoid(),
//         label: "Agreeableness",
//         children: [
//             "Trust",
//             "Straightforwardness",
//             "Altruism",
//             "Compliance",
//             "Modesty",
//             "Tender-mindedness",
//         ],
//     },
//     {
//         id: nanoid(),
//         label: "Extraversion",
//         children: [
//             "Gregariousness",
//             "Assertiveness",
//             "Activity",
//             "Excitement-seeking",
//             "Positive emotions",
//             "Warmth",
//         ],
//     },
// ];

// const keyword = [
//     {
//         id: nanoid(),
//         label: "Food",
//         children: [
//             { label: "Food Fruit" },
//             { label: "Food Meat" },
//             { label: "Food Salack", children: [{ label: "Food Salack 1" }] },
//         ],
//     },
//     {
//         id: nanoid(),
//         label: "Water",
//         children: [
//             { label: "Water Fruit" },
//             { label: "Water Meat" },
//             { label: "Water Salack", children: [{ label: "Water Salack 1" }] },
//         ],
//     },
// ];

// const DragDrop = () => {
//     const classes = useStyles();
//     const [board, setBoard] = useState<{ id: string; url: string }[]>([]);
//     const [{ isOver }, drop] = useDrop(() => ({
//         accept: "image",
//         drop: (item) => addImageToBoard(item),
//         collect: (monitor) => ({
//             isOver: !!monitor.isOver(),
//         }),
//     }));
//     console.log("board", board);

//     const addImageToBoard = (item) => {
//         console.log("id picture", item);

//         const picture: { id: string; url: string } | undefined =
//             PictureList.find((x) => x.id === item.id);

//         setBoard((board) => [...board, picture!]);
//     };

//     return (
//         <Fragment>
//             <div className="Pictures">
//                 {PictureList.map((picture) => {
//                     return (
//                         <Picture
//                             key={picture.id}
//                             url={picture.url}
//                             id={picture.id}
//                             className={classes.img}
//                         />
//                     );
//                 })}
//             </div>
//             <div
//                 ref={drop}
//                 style={{
//                     minHeight:
//                         board.length > 0
//                             ? board.length *
//                                   parseInt(PICTURE_HEIGHT.split("px")[0]) +
//                               "px"
//                             : PICTURE_HEIGHT,
//                     border: `5px solid pink`,
//                     width: parseInt(PICTURE_WIDTH.split("px")[0]) + 50 + "px",
//                 }}
//             >
//                 {board.map((picture) => {
//                     return (
//                         <Picture
//                             key={picture.id}
//                             url={picture.url}
//                             id={picture.id}
//                             className={classes.img}
//                         />
//                     );
//                 })}
//             </div>
//         </Fragment>
//     );
// };

// export default DragDrop;
export {};
