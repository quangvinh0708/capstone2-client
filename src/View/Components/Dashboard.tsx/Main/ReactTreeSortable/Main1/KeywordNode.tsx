import { Typography } from "@mui/material";
import React, { Fragment, ReactElement } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { useDispatch } from "react-redux";
import LineTo, { SteppedLineTo } from "react-lineto";
import { useDrag } from "react-dnd";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { TreeData } from "../../../../../../Config/data";
import { addBoxIcon } from "./styles";
import { Draggable } from "react-beautiful-dnd";
import { parse, stringify } from "query-string";
import { IRootState } from "../../../../../../Redux/Store/Reducers/combineReducers";
import { useSelector } from "react-redux";
import style from "./node.module.scss";
import cn from "classnames";
import { nanoid } from "nanoid";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
type Props = {
    childKeyword: TreeData;
    id: string;
    onRecursiveRender: (childKeyword: any) => ReactElement | undefined;
    classes: { [index: string]: string };
    onDisplaySubKeywordChildrenRecursive: Function;
    keywords: TreeData[];
    parentId?: string;
    index: any;
    parentCanDrag?: boolean;
};

const KeywordNode = ({
    childKeyword,
    onRecursiveRender,
    id,
    classes,
    onDisplaySubKeywordChildrenRecursive,
    keywords,
    parentId,
    index,
    parentCanDrag,
}: Props) => {
    const dispatch = useDispatch();

    const facetSelected = useSelector(
        (state: IRootState) => state.mainTreeHandle.facetSelected
    );

    const facetParentColor = useSelector(
        (state: IRootState) => state.mainTreeHandle.facetParentColor
    );
    const facetChildColor = useSelector(
        (state: IRootState) => state.mainTreeHandle.facetChildColor
    );

    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: "keyword",
    //     item: childKeyword,
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));

    // console.log("keyword node", childKeyword);
    // console.log("keyword node stringify", stringify(childKeyword));
    // console.log("keyword node parse", parse(stringify(childKeyword)));
    // console.log("childKeyword", childKeyword);

    const convertStringRecursive = (x, y = "") => {
        if (x.children && x.children?.length > 0) {
            for (let child of x.children) {
                let { title, id } = child;
                y +=
                    stringify({
                        tempChildren: `${title}-AND-${id}`,
                        tempParent: `${x.title}-AND-${x.id}-AND-${id}`,
                    }) +
                    "&" +
                    convertStringRecursive(child);
            }
            return y;
        } else return "";
    };

    const convertFromObjToQueryString = (x) => {
        let res: any = "";
        if (x.children && x.children.length > 0) {
            let str1 = "";
            let str2 = "";
            // const children = [...x.children];
            // for (let { title, id } of children) {
            //     str1 += stringify({ children: `${title}-AND-${id}` }) + "&";
            // }
            // console.log("X", x);

            str1 = convertStringRecursive(x);

            const newX = {
                ...x,
                children: undefined,
            };
            str2 = stringify(newX);
            res = str1 + str2;
        } else {
            res = stringify(x);
        }
        return res;
    };

    return (
        <Fragment>
            {parentCanDrag ? (
                <Draggable
                    key={childKeyword.id}
                    draggableId={
                        // stringify(childKeyword)
                        convertFromObjToQueryString(childKeyword)
                    }
                    index={index}
                >
                    {(provided, snapshot) => {
                        return (
                            <Typography
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                    display: `table`,
                                    userSelect: "none",
                                    padding: snapshot.isDragging
                                        ? `5px 5px 5px 5px`
                                        : `2px 5px`,
                                    margin: "0 0 8px 0",
                                    backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : childKeyword.id ===
                                          facetSelected[0]?.id
                                        ? facetChildColor.convertColor
                                        : // : "cornflowerblue",
                                          "#FFF",
                                    color: "black",
                                    border: `1px solid black`,
                                    minWidth: snapshot.isDragging
                                        ? `15%`
                                        : `80px`,
                                    minHeight: snapshot.isDragging
                                        ? `70px`
                                        : `auto`,
                                    borderRadius: `25px 25px`,
                                    whiteSpace: `nowrap`,

                                    ...provided.draggableProps.style,
                                    transform: `scale(0.88, 0.88)`,
                                }}
                                className={cn({
                                    [style.gradientBorder]: snapshot.isDragging,
                                })}
                            >
                                {childKeyword.children?.length ? (
                                    <Typography
                                        component={"span"}
                                        variant={"body2"}
                                        sx={{
                                            padding: `3px 5px !important`,
                                            fontWeight: `500 !important`,
                                            display: `flex`,
                                            // flexWrap: `nowrap`,
                                            marginLeft: `0.2px`,
                                            fontSize: snapshot.isDragging
                                                ? "18px"
                                                : "15px",
                                            margin: snapshot.isDragging
                                                ? "8px 5px"
                                                : "auto",
                                            textAlign: `left`,
                                            // transform: `scale(0.97, 0.97)`,
                                        }}
                                        className={classes.box}
                                        onClick={(e) => {
                                            onDisplaySubKeywordChildrenRecursive(
                                                e,
                                                childKeyword
                                            );
                                        }}
                                    >
                                        {!childKeyword.expanded ? (
                                            <CreateNewFolderIcon
                                                sx={{
                                                    ...addBoxIcon,
                                                    // fontSize: `17px`,
                                                    color: `#000`,
                                                    marginRight: `3px`,
                                                    marginTop: `1px`,
                                                }}
                                            />
                                        ) : (
                                            <IndeterminateCheckBoxIcon
                                                sx={addBoxIcon}
                                                color={"info"}
                                            />
                                        )}{" "}
                                        {childKeyword.title}
                                    </Typography>
                                ) : (
                                    <Fragment>
                                        <Typography
                                            component={"span"}
                                            variant={"button"}
                                            sx={{
                                                padding: `3px 5px !important`,
                                                fontWeight: `530 !important`,
                                                display: `table`,
                                                // flexWrap: `nowrap`,
                                                marginLeft: `0.2px`,
                                                fontSize: snapshot.isDragging
                                                    ? "18px"
                                                    : "15px",
                                                margin: snapshot.isDragging
                                                    ? "8px 5px"
                                                    : "auto",
                                                textAlign: `left`,
                                            }}
                                            className={classes.box}
                                            onClick={(e) => {
                                                onDisplaySubKeywordChildrenRecursive(
                                                    e,
                                                    childKeyword
                                                );
                                            }}
                                        >
                                            <FolderOpenIcon
                                                sx={{
                                                    ...addBoxIcon,
                                                    fontSize: `14px`,
                                                    color: `#000`,
                                                    marginTop:
                                                        snapshot.isDragging
                                                            ? "9px"
                                                            : `4px`,
                                                    marginRight: `5px`,
                                                }}
                                                // color={"warning"}
                                            />{" "}
                                            {childKeyword.title}
                                        </Typography>
                                    </Fragment>
                                )}
                            </Typography>
                        );
                    }}
                </Draggable>
            ) : !childKeyword.children?.length ? (
                <Draggable
                    key={childKeyword.id}
                    draggableId={stringify(childKeyword)}
                    index={index}
                >
                    {(provided, snapshot) => {
                        return (
                            <Typography
                                // variant="button"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                    display: `table`,
                                    userSelect: "none",
                                    padding: snapshot.isDragging
                                        ? `5px 5px 5px 5px`
                                        : `2px 5px`,
                                    margin: "0 0 8px 0",
                                    backgroundImage: snapshot.isDragging
                                        ? "#263B4A"
                                        : childKeyword.id ===
                                          facetSelected[0]?.id
                                        ? facetChildColor.convertColor
                                        : // : "cornflowerblue",
                                          "linear-gradient(#FFF, #FFF)",
                                    color:
                                        childKeyword.id === facetSelected[0]?.id
                                            ? "#FFF"
                                            : "#000",
                                    border: `1px solid black`,
                                    minWidth: snapshot.isDragging
                                        ? `15%`
                                        : `80px`,
                                    minHeight: snapshot.isDragging
                                        ? `70px`
                                        : `auto`,
                                    borderRadius: `25px 25px`,
                                    whiteSpace: `nowrap`,
                                    fontWeight: `530`,

                                    ...provided.draggableProps.style,
                                    transform: `scale(0.88, 0.88)`,
                                }}
                                className={cn({
                                    [style.gradientBorder]: snapshot.isDragging,
                                })}
                            >
                                {childKeyword.children?.length ? (
                                    <Typography
                                        component={"button"}
                                        variant={"body2"}
                                        sx={{
                                            padding: `3px 5px !important`,
                                            fontWeight: `500 !important`,
                                            display: `flex`,

                                            marginLeft: `0.2px`,
                                        }}
                                        className={classes.box}
                                        onClick={(e) => {
                                            onDisplaySubKeywordChildrenRecursive(
                                                e,
                                                childKeyword
                                            );
                                            // console.log("X", x);
                                        }}
                                    >
                                        {!childKeyword.expanded ? (
                                            <AddBoxIcon
                                                sx={{
                                                    ...addBoxIcon,
                                                    // fontSize: `17px`,
                                                    color: `#FFF`,
                                                }}
                                            />
                                        ) : (
                                            <IndeterminateCheckBoxIcon
                                                sx={addBoxIcon}
                                                color={"info"}
                                            />
                                        )}{" "}
                                        {childKeyword.title}
                                    </Typography>
                                ) : (
                                    // ------------------- Sub Facet --------------------
                                    <Fragment>
                                        <Typography
                                            component={"span"}
                                            variant={"button"}
                                            sx={{
                                                padding: `3px 5px !important`,
                                                fontWeight: `500 !important`,
                                                display: `flex`,
                                                // flexWrap: `nowrap`,
                                                marginLeft: `0.2px`,
                                                fontSize: snapshot.isDragging
                                                    ? "18px"
                                                    : "auto",
                                                margin: snapshot.isDragging
                                                    ? "8px 5px"
                                                    : "auto",
                                                textAlign: `left`,
                                                // textTransform: `capitalize`,
                                            }}
                                            className={classes.box}
                                            onClick={(e) => {
                                                onDisplaySubKeywordChildrenRecursive(
                                                    e,
                                                    childKeyword
                                                );
                                            }}
                                        >
                                            <FolderOpenIcon
                                                sx={{
                                                    ...addBoxIcon,
                                                    fontSize: `14px`,
                                                    color: `#000`,
                                                    marginTop:
                                                        snapshot.isDragging
                                                            ? "9px"
                                                            : `4px`,
                                                    marginRight: `5px`,
                                                }}
                                            />{" "}
                                            {childKeyword.title}
                                        </Typography>
                                    </Fragment>
                                )}
                            </Typography>
                        );
                    }}
                </Draggable>
            ) : (
                <Typography
                    sx={{
                        userSelect: "none",
                        // padding: 8,
                        margin: "0 0 8px 0",
                        color:
                            childKeyword.id === facetSelected[0]?.parentId
                                ? `#FFF`
                                : "#000",
                        minWidth: `170px`,
                        minHeight: `30px`,
                        border: `1px solid #000`,
                        // boxSizing: `border-box`,
                        borderRadius: `15px 15px`,

                        backgroundImage:
                            childKeyword.id === facetSelected[0]?.parentId
                                ? facetParentColor.convertColor
                                : "linear-gradient(#FFF, #FFF)",
                        transform: `scale(0.9, 0.9)`,
                    }}
                >
                    {childKeyword.children?.length ? (
                        <Typography
                            component={"span"}
                            variant={"body2"}
                            sx={{
                                padding: `3px 9px !important`,
                                fontWeight: `500 !important`,
                                display: `flex`,
                                // fontSize: `16px`,
                                marginLeft: `0.2px`,
                                minWidth: `200px`,
                                fontSize: `15px`,
                            }}
                            className={classes.box}
                            onClick={(e) => {
                                onDisplaySubKeywordChildrenRecursive(
                                    e,
                                    childKeyword
                                );
                            }}
                        >
                            {!childKeyword.expanded ? (
                                <CreateNewFolderIcon
                                    sx={{
                                        ...addBoxIcon,
                                        // fontSize: `17px`,
                                        marginRight: `3px`,
                                        color:
                                            childKeyword.id ===
                                            facetSelected[0]?.parentId
                                                ? `rgba(255, 255, 255, 1)`
                                                : "#000",
                                    }}
                                    // color={"info"}
                                />
                            ) : (
                                <IndeterminateCheckBoxIcon
                                    sx={addBoxIcon}
                                    color={"info"}
                                />
                            )}{" "}
                            {childKeyword.title}
                        </Typography>
                    ) : (
                        <Fragment>
                            {" "}
                            <FolderOpenIcon
                                sx={{
                                    ...addBoxIcon,
                                    fontSize: `15px`,
                                    background: facetParentColor,
                                }}
                                color={"info"}
                            />{" "}
                            {childKeyword.title}
                        </Fragment>
                    )}
                </Typography>
            )}

            {<Fragment>{onRecursiveRender(childKeyword)}</Fragment>}

            {/* <SteppedLineTo from={"li-" + parentId} to={"li-" + id} delay={0} /> */}
        </Fragment>
    );
};

export default KeywordNode;
