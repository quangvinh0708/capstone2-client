import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    keywordCard: {
        maxWidth: `60%`,
        margin: `auto`,
        background: `rgba(255, 255, 255, 0.2)`,
        "&::after": {
            content: '""',
            clear: "both",
            display: "table",
        },
    },
}));
