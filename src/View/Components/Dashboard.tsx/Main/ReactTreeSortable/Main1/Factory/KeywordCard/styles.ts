import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    keywordCard: {
        // width: `400px`,
        minWidth: `60%`,
        margin: `auto`,
        // transform: `scale(1, 1)`,
        overflow: `scroll`,

        background: `rgba(255, 255, 255, 0.2)`,
        "&::after": {
            content: '""',
            clear: "both",
            display: "table",
        },
    },
    keywordSortableTree: {
        background: ``,
        width: `400px`,
        minWidth: `400px`,
        minHeight: `80px`,
        maxHeight: `500px`,
        overflow: `auto`,
    },
    keywordTree: {
        transform: `scale(0.8, 0.8)`,
        marginLeft: `-47px`,
        position: `relative`,
    },
}));
