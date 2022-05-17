import { Box, CircularProgress } from "@mui/material";
import React from "react";

type Props = {
    classNameForBox?: any;
    cssInline?: { [index: string]: string | number };
};

const TreeLoading = ({ classNameForBox, cssInline }: Props) => {
    return (
        <Box sx={{ display: "flex", ...cssInline }} className={classNameForBox}>
            <CircularProgress />
        </Box>
    );
};

export default TreeLoading;
