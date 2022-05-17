import { nanoid } from "nanoid";
import React, { Children, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoxIcon, useStyles } from "./styles";
import { Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import KeywordNode from "./KeywordNode";
import { TreeData } from "../../../../../../Config/data";

type Props = {
    keywords: TreeData[];
    provided: any;
    snapshot: any;
    parentCanDrag?: boolean;
};

const KeywordTree = ({
    keywords,
    provided,
    snapshot,
    parentCanDrag = true,
}: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDisplayChildren = (e, keyword) => {
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
                            keyword.children?.map((childKeyword, i) => {
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
                                        index={i}
                                        keywords={keywords}
                                        parentCanDrag={parentCanDrag}
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
                {keywords.map((keyword, i) => {
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
                            index={i}
                            parentCanDrag={parentCanDrag}
                        />
                    );
                })}
            </ul>
        </Fragment>
    );
};

export default KeywordTree;
