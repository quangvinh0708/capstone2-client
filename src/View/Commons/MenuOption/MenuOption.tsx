import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { mainTreeHandle } from "../../../Redux/Features/MainTreeHandle/actions";
import { IRootState } from "../../../Redux/Store/Reducers/combineReducers";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { nanoid } from "nanoid";

type Props = {
    children: any;
    stateSelected: any;
    onDelete: any;
    onAdd: any;
    id?: any;
};

export default function MenuOption({
    children,
    stateSelected,
    onDelete,
    onAdd,
    id,
}: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentSelected, setCurrentSelected] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        return stateSelected.length > 0
            ? setAnchorEl(event.currentTarget)
            : false;
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteStateSelected = () => {
        onDelete();
        handleClose();
    };

    const handleAddToListContainer = () => {
        if (typeof onAdd === "function" || typeof onAdd !== "undefined") {
            onAdd();
            handleClose();
        }
    };

    return (
        <div style={{ textAlign: `center` }}>
            <Button
                // id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
                sx={{
                    margin: `9px 0 2px 0px`,
                    position: `relative`,
                    border: `1px solid black`,
                }}
                id={id}
            >
                {children}
                {stateSelected.length > 0 &&
                    stateSelected.map((s) => {
                        return (
                            // <IconButton
                            //     key={nanoid()}
                            //     sx={{
                            //         background: `cornflowerblue !important`,
                            //         position: `absolute`,
                            //         right: -12,
                            //         top: -13,
                            //         zIndex: 10,
                            //         color: `#FFFFFF`,
                            //         "&:hover": {
                            //             backgroundImage: `linear-gradient(45deg, cornflowerblue 15%, #00d4ff) !important`,
                            //             color: `#FFFFFF`,
                            //         },
                            //         padding: `5px`,
                            //     }}
                            // >
                            <CloseIcon
                                key={s.id}
                                sx={{
                                    background: `cornflowerblue !important`,
                                    position: `absolute`,
                                    right: -12,
                                    top: -13,
                                    zIndex: 10,
                                    color: `#FFFFFF`,
                                    "&:hover": {
                                        backgroundImage: `linear-gradient(45deg, cornflowerblue 15%, #00d4ff) !important`,
                                        color: `#FFFFFF`,
                                    },
                                    borderRadius: `50%`,
                                    padding: `5px`,
                                    fontSize: `12px`,
                                    // color="white"
                                }}
                                // color="white"
                            />
                            // </IconButton>
                        );
                    })}
            </Button>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {typeof onAdd !== "undefined" && (
                    <MenuItem onClick={handleAddToListContainer}>
                        Select
                    </MenuItem>
                )}
                <MenuItem onClick={handleDeleteStateSelected}>Delete</MenuItem>
            </Menu>
        </div>
    );
}
