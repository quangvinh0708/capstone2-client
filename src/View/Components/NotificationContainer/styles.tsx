import { makeStyles } from "@mui/styles";
import { PICTURE_HEIGHT, PICTURE_WIDTH } from "../../Commons/Picture/picture";

export const useStyles = makeStyles(() => ({
    question: {
        fontSize: `15.7px !important`,
        marginBottom: `5px !important`,
        color: `#001188 !important`,
        fontWeight: `450 !important`,
    },
    notation: {
        fontSize: `13px !important`,
        // marginLeft: `5px !important`,
    },
    values: {
        color: `#000 !important`,
        fontWeight: `470 !important`,
    },
}));
