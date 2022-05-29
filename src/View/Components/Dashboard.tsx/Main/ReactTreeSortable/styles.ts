import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    facetTree: {
        transform: `scale(0.8, 0.8)`,
        marginLeft: `-47px`,
    },

    facetSortableTree: {
        background: ``,
        width: `400px`,
        minWidth: `400px`,
        height: `800px`,
        overflow: `scroll`,
    },
    keywordTree: {
        // marginLeft: `auto`,
        // float: "right",
        marginRight: `-45px`,
        transform: `scale(0.9, 0.9)`,
    },
    keywordSortableTree: {
        background: ``,
        width: `400px`,
        minWidth: `400px`,
        overflow: `scroll`,
        height: `800px`,
    },
}));
