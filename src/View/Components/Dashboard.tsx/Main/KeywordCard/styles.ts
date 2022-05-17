import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    keywordCard: {
        // width: `400px`,
        minWidth: `60%`,
        height: `500px`,
        margin: `auto`,
        background: `rgba(255, 255, 255, 0.2)`,
        "&::after": {
            content: '""',
            clear: "both",
            display: "table",
        },
    },
}));
