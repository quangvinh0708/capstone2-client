import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    suggestQuestionModal: {
        borderRadius: `50px`,
    },
    traitBox: {
        marginTop: `20px`,
        marginRight: `50px`,
    },
    evaluateBox: {
        marginTop: `30px`,
        display: `flex`,
        justifyContent: `space-between`,
        textAlign: `center`,
        paddingBottom: `18px`,
        borderBottom: `2px solid #a0a0a0`,
    },
    traitLabel: {
        fontSize: `18px`,
        fontWeight: `bold`,
    },
    scoreField: {
        marginTop: `15px`,
    },
}));
