import { Box } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Facet, keywords } from "../../../Config/data";
import { useStyles } from "./styles";
import Tree from "./Tree/Tree";
import { IRootState } from "../../../Redux/Store/Reducers/combineReducers";
import style from "./Tree/Node/node.module.scss";
import { SteppedLineTo } from "react-lineto";
import Main from "./Main/Main";
import KeywordTree from "./KeywordTree/KeywordTree";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const classes = useStyles();

    const facet = useSelector((state: IRootState) => state.facetTree.facet);
    const keywords = useSelector(
        (state: IRootState) => state.keywordTree.keywords
    );
    const dispatch = useDispatch();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (item) => {
        console.log("id picture", item);

        // const picture: Facet[] | undefined = facet.find(
        //     (x) => x.id === item.id
        // );

        // setBoard((board) => [...board, picture!]);
    };

    return (
        <Fragment>
            <Box
                sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    alignItems: `center`,
                    marginTop: `70px`,
                }}
            >
                <Box
                    sx={{
                        width: 250,

                        // "&:hover": {
                        //     backgroundColor: "primary.main",
                        //     opacity: [0.9, 0.8, 0.7],
                        // },
                        // backgroundColor: "palegreen",
                        // border: `5px solid pink`,
                        boxSizing: `border-box`,
                        background: `#FFF`,
                        borderRadius: `15px`,
                        padding: `15px 0 15px 5px`,
                        boxShadow: `0px 0px 18px #e0e0e0`,
                    }}
                    // className={style.gradientBorder}
                    className="A1"
                >
                    <Tree facet={facet} className={classes.img} />
                </Box>

                <Box
                    sx={{
                        flexGrow: 7,
                        minHeight: `100vh`,
                        margin: `0 8px`,
                        // "&:hover": {
                        //     backgroundColor: "primary.main",
                        //     opacity: [0.9, 0.8, 0.7],
                        // },
                        // backgroundColor: "palegreen",
                        borderBottom: `1px solid #e0e0e0`,
                        borderLeft: `1px solid #e0e0e0`,
                        boxShadow: `0px 0px 18px #e0e0e0`,
                        // boxShadow: `0px 0px 9px #e0e0e0`,
                    }}
                    // className={style.gradientBorder}
                >
                    <Main />
                </Box>

                <Box
                    sx={{
                        width: 250,
                        // border: `5px solid pink`,
                        background: `#FFF`,
                        borderRadius: `15px`,
                        padding: `15px 0 15px 5px`,
                        boxShadow: `0px 0px 18px #e0e0e0`,
                        boxSizing: `border-box`,
                    }}
                    className="B1"
                >
                    <KeywordTree keywords={keywords} />
                </Box>
                {/* <SteppedLineTo from={"A1"} to={"B1"} delay={0} /> */}
            </Box>
            <ToastContainer />
        </Fragment>
    );
};

export default Dashboard;
