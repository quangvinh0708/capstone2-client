import { nanoid } from "nanoid";
import React, { Children, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Keyword } from "../../../../Config/data";
import { addBoxIcon, useStyles } from "./styles";
import { IRootState } from "./../../../../Redux/Store/Reducers/combineReducers";
import { Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import KeywordNode from "./KeywordNode/KeywordNode";
import { keywordTree } from "../../../../Redux/Features/KeywordTree/actions";
import LineTo from "react-lineto";

type Props = {
    keywords: Keyword[];
};

const KeywordTree = ({ keywords }: Props) => {
    // const keywords = useSelector(
    //     (state: IRootState) => state.keywordTree.keywords
    // );
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDisplayChildren = (e, keyword) => {
        // const newKeyword = keywords.map((k) =>
        //     k.id === keyword.id ? { ...k, isExpanding: !k.isExpanding } : k
        // );
        // dispatch(keywordTree.success(newKeyword));
        const target = e.target;
        let ele = document!.getElementById(`${`ul-` + keyword.id}`)!;
        ele.classList.toggle(classes.displayNested);
        console.log("li", ele);
    };

    const handleDisplaySubKeyWordChildrenRecursive = (
        e,
        keywords,
        subKeyword
    ) => {
        const res = [];
        keywords.forEach((keyword) => {
            if (keyword.id === subKeyword.id) {
            }
        });
    };

    const recursiveRender = (keyword) => {
        if (keyword.children?.length) {
            return (
                <Fragment>
                    <ul
                        // className={
                        //     classes.ulNested +
                        //     " " +
                        //     (keyword.isExpanding === true
                        //         ? classes.displayNested
                        //         : classes.hideNested)
                        // }
                        className={classes.ulNested + " " + classes.hideNested}
                        id={`ul-` + keyword.id}
                    >
                        {keyword.children?.length &&
                            keyword.children?.map((childKeyword) => {
                                const x = childKeyword.id;
                                return (
                                    <KeywordNode
                                        key={x}
                                        childKeyword={childKeyword}
                                        onRecursiveRender={recursiveRender}
                                        id={x}
                                        parentId={keyword.id}
                                        classes={classes}
                                        onDisplaySubKeywordChildrenRecursive={
                                            handleDisplayChildren
                                        }
                                        keywords={keywords}
                                    />
                                );
                            })}
                    </ul>
                </Fragment>
            );
        }
    };

    return (
        <Fragment>
            <ul className={classes.ul}>
                {keywords.map((keyword) => {
                    return (
                        <KeywordNode
                            key={keyword.id}
                            childKeyword={keyword}
                            onRecursiveRender={recursiveRender}
                            id={keyword.id}
                            classes={classes}
                            onDisplaySubKeywordChildrenRecursive={
                                handleDisplayChildren
                            }
                            keywords={keywords}
                        />
                    );
                })}
            </ul>
        </Fragment>
    );
};

export default KeywordTree;
