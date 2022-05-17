import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import style from "./style.module.scss";
import LoadingModal from "../LoadingModal/LoadingModal";
import { useSelector } from "react-redux";
import { IRootState } from "../../../Redux/Store/Reducers/combineReducers";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function     AlertDialogSlide({
    openDialog,
    headingText,
    contentBody,
    paragraph = "",
    onClickOpenAlertDialogSlide,
    onClickCloseAlertDialogSlide,
    headingTextColor,
    addFacetToFacetCardSuccess,
}) {
    const isLoadingForSavingProgress = useSelector(
        (state: IRootState) => state.mainTreeHandle.isLoadingForSavingProgress
    );

    const handleClickOpen = () => {
        onClickOpenAlertDialogSlide();
    };

    const handleClose = () => {
        onClickCloseAlertDialogSlide();
    };

    return (
        <div style={{ background: `red` }}>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ borderRadius: `75px !important` }}
                className={style.div}
            >
                {isLoadingForSavingProgress && (
                    <LoadingModal open={isLoadingForSavingProgress} />
                )}
                <DialogTitle sx={{ color: `${headingTextColor}` }}>
                    {headingText}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        sx={{ color: `#000` }}
                    >
                        {contentBody}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                        {paragraph}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Cancel
                    </Button>
                    <Button
                        onClick={addFacetToFacetCardSuccess}
                        variant="outlined"
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
