import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { mainTreeHandle } from "../../../Redux/Features/MainTreeHandle/actions";
import { IRootState } from "../../../Redux/Store/Reducers/combineReducers";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Container } from "../../../Redux/Features/MainTreeHandle/reducer";
type Props = {
    children?: any;
    onClose?: any;
    onAdd?: any;
    id?: any;
    onGetSuggestQuestions?: any;
    onCloseMenu: any;
    open: any;
    anchorEl: any;
    onClearSuggestQuestions: any;
};

export default function CloseMenu({
    children,
    onClose,
    onAdd,
    id,
    onGetSuggestQuestions,
    onCloseMenu,
    open,
    anchorEl,
    onClearSuggestQuestions,
}: Props) {
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [currentSelected, setCurrentSelected] = React.useState(null);

    // const open = Boolean(anchorEl);

    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const handleDeleteStateSelected = () => {
        onClose();
        onCloseMenu();
    };

    const handleGetSuggestQuestions = () => {
        onGetSuggestQuestions();
        onCloseMenu();
    };

    const handleClearSuggestQuestions = () => {
        onClearSuggestQuestions();
        onCloseMenu();
    };

    return (
        <div style={{ textAlign: `center` }}>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={onCloseMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleGetSuggestQuestions}>
                    Suggest Questions
                </MenuItem>
                <MenuItem onClick={handleClearSuggestQuestions}>
                    Clear Questions
                </MenuItem>
                <MenuItem onClick={handleDeleteStateSelected}>Close</MenuItem>
            </Menu>
        </div>
    );
}
