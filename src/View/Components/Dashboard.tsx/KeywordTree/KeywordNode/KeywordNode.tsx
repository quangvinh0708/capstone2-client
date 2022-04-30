import { Typography } from "@mui/material";
import React, { Fragment, ReactElement } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { addBoxIcon } from "../styles";
import { Keyword, SubKeyword } from "../../../../../Config/data";
import { keywordTree } from "../../../../../Redux/Features/KeywordTree/actions";
import { useDispatch } from "react-redux";
import LineTo, { SteppedLineTo } from "react-lineto";
import { useDrag } from "react-dnd";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

type Props = {
    childKeyword: SubKeyword;
    id: string;
    onRecursiveRender: (childKeyword: any) => ReactElement | undefined;
    classes: { [index: string]: string };
    onDisplaySubKeywordChildrenRecursive: Function;
    keywords: Keyword[];
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

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "keyword",
        item: childKeyword,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <Fragment>
            <li className={"li-" + id} ref={drag}>
                {childKeyword.children?.length ? (
                    <Typography
                        component={"span"}
                        variant={"body2"}
                        sx={{
                            padding: `3px 0px !important`,
                            fontWeight: `500 !important`,
                            display: `flex`,

                            marginLeft: `0.2px`,
                        }}
                        className={classes.box}
                        onClick={(e) => {
                            let x = onDisplaySubKeywordChildrenRecursive(
                                e,
                                childKeyword
                            );  
                            console.log("X", x);
                        }}
                    >
                        {!childKeyword.isExpanding ? (
                            <AddBoxIcon
                                sx={{
                                    ...addBoxIcon,
                                    // fontSize: `17px`,
                                }}
                                color={"info"}
                            />
                        ) : (
                            <IndeterminateCheckBoxIcon
                                sx={addBoxIcon}
                                color={"info"}
                            />
                        )}{" "}
                        {childKeyword.label}
                    </Typography>
                ) : (
                    <Fragment>
                        {" "}
                        <FolderOpenIcon
                            sx={{ ...addBoxIcon, fontSize: `14px` }}
                            color={"info"}
                        />{" "}
                        {childKeyword.label}
                    </Fragment>
                )}
            </li>
            {<Fragment>{onRecursiveRender(childKeyword)}</Fragment>}

            {/* <SteppedLineTo from={"li-" + parentId} to={"li-" + id} delay={0} /> */}
        </Fragment>
    );
};

export default KeywordNode;
