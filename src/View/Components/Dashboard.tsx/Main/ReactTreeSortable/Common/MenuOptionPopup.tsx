import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export default function MenuOptionPopup({
    facet,
    children,
    onDelete,
    onAdd,
    menuChildren,
}: any) {
    const handle = (func, cb) => {
        func();
        cb.close();
    };
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    {children(popupState)}
                    <Menu {...bindMenu(popupState)} sx={{ zIndex: 9000 }}>
                        <MenuItem onClick={() => handle(onDelete, popupState)}>
                            Delete
                        </MenuItem>
                        {menuChildren && menuChildren(popupState)}
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
