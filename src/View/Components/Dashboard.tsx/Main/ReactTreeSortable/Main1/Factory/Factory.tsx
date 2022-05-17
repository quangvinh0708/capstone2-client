import { Box } from "@mui/material";
import React from "react";
import FacetCard from "./FacetCard/FacetCard";
import Xarrow from "react-xarrows";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../../../../Redux/Store/Reducers/combineReducers";
import { useDispatch } from "react-redux";
import { mainTreeHandle } from "../../../../../../../Redux/Features/MainTreeHandle/actions";
import { Droppable } from "react-beautiful-dnd";
import KeywordCard from "./KeywordCard/KeywordCard";
import QuestionListContainer from "./QuestionsContainer/QuestionListContainer";
import AlertDialogSlide from "../../../../../../Commons/AlertDialogSlide/AlertDialogSlide";

type Props = { facetCardDroppableId: string; keywordCardDroppableId: string };

const handleConnectFacetAndKeyword = () => {
    return (
        <React.Fragment>
            {/* {keywordSelected.length && facetSelected.length ? (
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
            ) : undefined} */}
        </React.Fragment>
    );
};
const Factory = ({ facetCardDroppableId, keywordCardDroppableId }: Props) => {
    const idForXarrowBegin = nanoid();
    const idForXarrowEnd = nanoid();

    const dispatch = useDispatch();

    const openDialog = useSelector(
        (state: IRootState) => state.mainTreeHandle.openDialog
    );

    const [facet, setFacet] = React.useState<any>({});

    const keywordSelected = useSelector(
        (state: IRootState) => state.mainTreeHandle.keywordSelected
    );

    const facetSelected = useSelector(
        (state: IRootState) => state.mainTreeHandle.facetSelected
    );

    const addFacetToFacetCardSuccess = () => {
        dispatch(
            mainTreeHandle.addFacetSelected.request({
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

    const renderXarrowFacetCardAndKeywordCard = () => {
        return facetSelected.length || keywordSelected.length ? (
            <Xarrow
                start={idForXarrowBegin}
                end={idForXarrowEnd}
                path={"smooth"}
                showHead={false}
                // labels="Related"
                animateDrawing={true}
                startAnchor={"bottom"}
                endAnchor={"top"}
                zIndex={1}
                strokeWidth={4}
            />
        ) : (
            void 0
        );
    };

    return (
        <div
            // sx={{ display: `table`}}
            // id={idForXarrowBegin}
            style={{ margin: `0 20px` }}
        >
            <FacetCard
                className="FC"
                id={idForXarrowBegin}
                facetSelected={facetSelected}
                facetCardDroppableId={facetCardDroppableId}
            />

            <KeywordCard
                className="KC"
                start={idForXarrowBegin}
                id={idForXarrowEnd}
                keywordSelected={keywordSelected}
                keywordCardDroppableId={keywordCardDroppableId}
            />
            {/* {renderXarrowFacetCardAndKeywordCard()} */}
            <QuestionListContainer />
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
        </div>
    );
};

export default Factory;
