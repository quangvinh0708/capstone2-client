import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import { IRootState } from "../../../Redux/Store/Reducers/combineReducers";
import { useDispatch, useSelector } from "react-redux";
import { mainTreeHandle } from "../../../Redux/Features/MainTreeHandle/actions";

const style = {
    width: `100%`,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    // textAlign: `center`,
    // zIndex: `1000`,
};

export default function LoadingModal({ open }) {
    const errorMessage = useSelector(
        (state: IRootState) => state.mainTreeHandle.errorMessage
    );

    const dispatch = useDispatch();

    const handleClose = () =>
        dispatch(mainTreeHandle.openLoadingForSavingProgress.success(false));

    return (
        <div>
            <Modal
                open={open}
                onClose={errorMessage ? handleClose : undefined}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, textAlign: errorMessage && "center" }}>
                    {errorMessage ? (
                        <Button
                            component="p"
                            sx={{
                                fontSize: `18px`,
                                fontWeight: `500`,
                                color: `#6495ED`,
                            }}
                            variant="outlined"
                            onClick={handleClose}
                        >
                            {errorMessage}
                        </Button>
                    ) : (
                        <CircularProgress />
                    )}
                    {/* Add Successfully! */}
                </Box>
            </Modal>
        </div>
    );
}
