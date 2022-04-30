import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStyles } from "./styles";
import FacetCard from "./FacetCard/FacetCard";
import KeywordCard from "./KeywordCard/KeywordCard";
import { Box } from "@mui/material";
import LineTo, { SteppedLineTo } from "react-lineto";
import Xarrow from "react-xarrows";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../Redux/Store/Reducers/combineReducers";
import { mainTreeHandle } from "../../../../Redux/Features/MainTreeHandle/actions";
import QuestionNestedList from "./QuestionList/QuestionList";
import { Container } from "../../../../Redux/Features/MainTreeHandle/reducer";
import AlertDialogSlide from "../../../Commons/AlertDialogSlide/AlertDialogSlide";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Main() {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [facet, setFacet] = React.useState<any>({});

    const idForXarrowBegin = nanoid();
    const idForXarrowEnd = nanoid();

    const dispatch = useDispatch();

    const openDialog = useSelector(
        (state: IRootState) => state.mainTreeHandle.openDialog
    );

    const keywordSelected = useSelector(
        (state: IRootState) => state.mainTreeHandle.keywordSelected
    );

    const facetSelected = useSelector(
        (state: IRootState) => state.mainTreeHandle.facetSelected
    );

    const listContainer = useSelector(
        (state: IRootState) => state.mainTreeHandle.listContainer
    );

    const addFacetToFacetCard = (facet) => {
        dispatch(
            mainTreeHandle.addFacetSelected.request({
                ...facet,
                isOverride: false,
            })
        );
        setFacet(facet);
    };

    const addFacetToFacetCardSuccess = () => {
        dispatch(
            mainTreeHandle.addFacetSelected.request({
                ...facet,
                isOverride: true,
            })
        );
    };

    const handleClickOpenAlertDialogSlide = () => {
        dispatch(mainTreeHandle.openDialog.success(true));
    };

    const handleClickCloseAlertDialogSlide = () => {
        dispatch(mainTreeHandle.openDialog.success(false));
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDeleteFacetSelected = () => {
        dispatch(mainTreeHandle.updateFacetSelected.success([]));
    };

    const handleDeleteKeywordSelected = () => {
        dispatch(mainTreeHandle.updateKeywordSelected.success([]));
    };

    const handleConnectFacetAndKeyword = () => {
        return (
            <React.Fragment>
                {keywordSelected.length && facetSelected.length ? (
                    <Xarrow
                        start={idForXarrowBegin}
                        end={idForXarrowEnd}
                        path={"grid"}
                        showHead={true}
                        // labels="Related"
                        animateDrawing={true}
                        // dashness={true}
                    />
                ) : undefined}

                {(!keywordSelected.length && facetSelected.length) ||
                (keywordSelected.length && !facetSelected.length) ? (
                    <Xarrow
                        start={idForXarrowBegin}
                        end={idForXarrowEnd}
                        path={"grid"}
                        showHead={true}
                        // labels="Related"
                        animateDrawing={true}
                        dashness={true}
                    />
                ) : undefined}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Box>
                <FacetCard
                    className="FC"
                    id={idForXarrowBegin}
                    facetSelected={facetSelected}
                    addFacetToFacetCard={addFacetToFacetCard}
                />
                <KeywordCard
                    className="KC"
                    id={idForXarrowEnd}
                    keywordSelected={keywordSelected}
                />

                {handleConnectFacetAndKeyword()}
                {listContainer.length ? (
                    <Box className={classes.listContainer}>
                        {listContainer.map(
                            (container: Container, _i: number) => {
                                const idForArrowBetweenKeyWordAndContainer =
                                    nanoid();
                                return (
                                    <React.Fragment key={nanoid()}>
                                        <QuestionNestedList
                                            key={nanoid()}
                                            container={container}
                                            id={
                                                idForArrowBetweenKeyWordAndContainer
                                            }
                                        />
                                        <Xarrow
                                            key={nanoid()}
                                            start={container.keyword.id}
                                            end={
                                                idForArrowBetweenKeyWordAndContainer
                                            }
                                            path={"grid"}
                                            showHead={true}
                                            // labels="Related"
                                            animateDrawing={true}
                                            strokeWidth={4}
                                            startAnchor="right"
                                            endAnchor="top"

                                            // dashness={true}
                                        />
                                    </React.Fragment>
                                );
                            }
                        )}
                    </Box>
                ) : undefined}
            </Box>
            {/* <SteppedLineTo
                    from={"FC"}
                    to={"KC"}
                    delay={0}
                    borderWidth={4}
                    borderStyle="solid"
                    borderColor="black"
                /> */}
            <AlertDialogSlide
                openDialog={openDialog}
                headingText={"WARNING"}
                headingTextColor={"#face30"}
                contentBody={`Looks like there are some data in the previous. Choose a new facet will delete all data before.`}
                paragraph={"Do you want to continue?"}
                onClickOpenAlertDialogSlide={handleClickOpenAlertDialogSlide}
                onClickCloseAlertDialogSlide={handleClickCloseAlertDialogSlide}
                addFacetToFacetCardSuccess={addFacetToFacetCardSuccess}
            />
        </React.Fragment>
    );
}
