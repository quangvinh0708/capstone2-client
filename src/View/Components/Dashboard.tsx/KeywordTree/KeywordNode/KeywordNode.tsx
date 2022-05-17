import { Typography } from "@mui/material";
import React, { Fragment, ReactElement } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { addBoxIcon } from "../styles";
import { TreeData } from "../../../../../Config/data";
import { keywordTree } from "../../../../../Redux/Features/KeywordTree/actions";
import { useDispatch } from "react-redux";
import LineTo, { SteppedLineTo } from "react-lineto";
import { useDrag } from "react-dnd";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

type Props = {
    childKeyword: TreeData;
    id: string;
    onRecursiveRender: (childKeyword: any) => ReactElement | undefined;
    classes: { [index: string]: string };
    onDisplaySubKeywordChildrenRecursive: Function;
    keywords: TreeData[];
    parentId?: string;
};

const KeywordNode = ({
    childKeyword,
    onRecursiveRender,
    id,
    classes,
    onDisplaySubKeywordChildrenRecursive,
    keywords,
    parentId,
}: Props) => {
    const dispatch = useDispatch();

    return <Fragment>a</Fragment>;
};

export default KeywordNode;
