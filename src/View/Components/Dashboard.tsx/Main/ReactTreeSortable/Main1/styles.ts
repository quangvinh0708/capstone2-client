import { makeStyles } from "@mui/styles";

export const addBoxIcon = {
    fontSize: `17px`,
    marginTop: `1px`,
};

export const useStyles = makeStyles(() => ({
    facetTree: {
        // padding: 4,
        // width: 250,
        // minHeight: 400,
        maxHeight: `90vh`,
        // transform: `scale(0.9, 0.9)`,

        // width: `90px`,
        minWidth: `180px`,
        // flexGrow: 1,
        overflow: `auto`,
    },

    keywordTree: {
        // padding: 4,
        // width: 250,
        // minHeight: 300,
        maxHeight: `90vh`,
        // transform: `scale(0.9, 0.9)`,

        minWidth: `170px`,
        overflow: `auto`,
        // marginRight: `-7px`,
    },

    checkBox: {
        // eslint-disable-next-line no-octal-escape
        "&::before": { content: "\u2611", color: "dodgerblue" },
    },
    ul: {
        listStyleType: "none",
        margin: "0",
        padding: "0",

        // transitionTimingFunction: `linear`,
        // transition: `all 2s`,
        // animation: `$fadeInFromLeft 1s ease-in-out`,
    },
    "@keyframes fadeInFromLeft": {
        "0%": {
            marginTop: "-700px",
        },
        "100%": {
            opacity: 1,
            marginTop: "-0px",
        },
    },
    ulNested: {
        listStyleType: "none",
        transitionTimingFunction: `linear`,
        transition: `all 0.8s`,
        animation: `$ulFromTopToBottom 0.7s ease-in-out`,
        // marginLeft: `-25px`,
    },
    "@keyframes ulFromTopToBottom": {
        "0%": {
            opacity: 0.5,
            marginTop: `-17px`,
        },
        "100%": {
            opacity: 1,
            marginTop: `0px`,
        },
    },
    "@keyframes ulFromBottomToTop": {
        "0%": {
            opacity: 1,
            marginTop: `-17px`,
        },
        "100%": {
            opacity: 0,
            marginTop: `0px`,
            display: `none`,
        },
    },
    hideNested: {
        display: `none`,
        transition: `all 2s`,
    },
    displayNested: {
        display: `block !important`,
        transition: `all 2s`,
    },
    active: {
        display: `block`,
    },
    box: {
        cursor: "pointer",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
    },
}));
