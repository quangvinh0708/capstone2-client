// import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
// import { Typography } from "@mui/material";
// import { nanoid } from "nanoid";
// import React, { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Facet } from "../../../../Config/data";
// import { facetTree } from "../../../../Redux/Features/FacetTree/actions";
// import Node from "./Node/Node";
// import { addBoxIcon, useStyles } from "./style";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import { IRootState } from "../../../../Redux/Store/Reducers/combineReducers";

// type Props = {
//     className?: string;
//     facet?: Facet[];
// };

// const Tree = (props: Props) => {
//     // const { facet } = props;
//     const facet = useSelector((state: IRootState) => state.facetTree.facet);

//     const classes = useStyles();
//     const dispatch = useDispatch();

//     const renderChildren = (f) => {
//         if (f?.children?.length > 0) {
//             return (
//                 <ul
//                     id={"ul-" + f.id}
//                     className={
//                         classes.ulNested +
//                         " " +
//                         (f.isExpanding === true
//                             ? classes.displayNested
//                             : classes.hideNested)
//                     }
//                 >
//                     {f.children.map((child) => {
//                         const x = nanoid();
//                         return <Node child={child} id={x} key={x} parent={f} />;
//                     })}
//                 </ul>
//             );
//         }
//     };

//     const handleDisplayChildren = (e, id) => {
//         const newFacet = facet.map((f) =>
//             f.id === id ? { ...f, isExpanding: !f.isExpanding } : f
//         );
//         dispatch(facetTree.success(newFacet));
//     };

//     return (
//         <ul className={classes.ul}>
//             {facet.map((f) => {
//                 return (
//                     <li key={f.id}>
//                         {f?.children?.length > 0 ? (
//                             <Typography
//                                 component={"span"}
//                                 variant={"body2"}
//                                 sx={{
//                                     padding: `3px 5px !important`,
//                                     fontWeight: `500 !important`,
//                                     display: `flex`,
//                                 }}
//                                 className={classes.box}
//                                 id={`li-` + f.id}
//                                 onClick={(e) => handleDisplayChildren(e, f.id)}
//                             >
//                                 {!f.isExpanding ? (
//                                     <AddBoxIcon
//                                         sx={{
//                                             ...addBoxIcon,
//                                         }}
//                                         color={"info"}
//                                     />
//                                 ) : (
//                                     <IndeterminateCheckBoxIcon
//                                         sx={addBoxIcon}
//                                         color={"info"}
//                                     />
//                                 )}
//                                 {f.label}
//                             </Typography>
//                         ) : (
//                             <Fragment>{f.label}</Fragment>
//                         )}
//                         {<Fragment>{renderChildren(f)}</Fragment>}
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// };

// export default Tree;
export {};
