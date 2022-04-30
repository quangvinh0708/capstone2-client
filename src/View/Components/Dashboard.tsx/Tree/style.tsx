import { makeStyles } from "@mui/styles";

export const addBoxIcon = {
    fontSize: `17px`,
    marginTop: `1px`,
};

export const useStyles = makeStyles(() => ({
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
        transition: `all 2s`,
        animationDuration: `4s`,
    },
    hideNested: {
        display: `none`,
        transition: `all 2s`,
    },
    displayNested: {
        display: ``,
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
        // "&::before": {
        //     content: "ABX",
        //     color: "black",
        //     display: "inline-block",
        //     marginRight: "6px",
        // },
    },
}));
