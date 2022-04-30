import { makeStyles } from "@mui/styles";
import { PICTURE_HEIGHT, PICTURE_WIDTH } from "../../Commons/Picture/picture";

export const useStyles = makeStyles(() => ({
    img: {
        width: PICTURE_WIDTH,
        height: PICTURE_HEIGHT,
        margin: `7px`,
    },
}));
