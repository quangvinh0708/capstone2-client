import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    questionList: {
        maxHeight: `400px`,
        overflowY: `auto`,
        overflowX: `hidden`,
        // display: `table`,
        "::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
        },
        "::-webkit-scrollbar-thumb": {
            // backgroundImage: `linear-gradient(45deg, #a0a0a0 50%, #6495ED 50%) !important`,
            background: `#a0a0a0`,
            borderRadius: "20px",
            border: "6px solid transparent",
            backgroundClip: "content-box",
        },
        "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#6495ed",
        },
    },
}));
