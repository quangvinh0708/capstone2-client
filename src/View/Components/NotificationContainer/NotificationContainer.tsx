import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStyles } from "./styles";
import { Box, CircularProgress, MenuItem } from "@mui/material";
import CustomSelect from "../../Commons/Select/CustomSelect";

export default function NotificationContainer({
    notification,
    onGetOutputModelResult,
    onClickQuestion,
}: any) {
    const classes = useStyles();

    const [data, setData] = React.useState({
        location: 1,
        gender: 1,
        age: 1,
    });

    const handleGetOutputModelResult = () => {
        onGetOutputModelResult({
            ...data,
            question: notification.question,
            id: notification.id,
        });
    };

    const handleChangeData = (e) => {
        setData((previousData) => ({
            ...previousData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClickQuestion = () => {
        onClickQuestion({
            ...notification,
            question: notification.question,
            facet: {
                parentTitle: notification.trait,
            },
            keyword: {
                title: notification.title,
            },
            _id: notification.id,
        });
    };

    console.log("data", data);

    const selectionSet = [
        <CustomSelect
            label={"Location"}
            data={data.location}
            menuItems={[
                <MenuItem value={1}>City</MenuItem>,
                <MenuItem value={2}>Country</MenuItem>,
            ]}
            onChange={handleChangeData}
        />,
        <CustomSelect
            label={"Gender"}
            data={data.gender}
            menuItems={[
                <MenuItem value={1}>Male</MenuItem>,
                <MenuItem value={2}>Female</MenuItem>,
            ]}
            onChange={handleChangeData}
        />,
        <CustomSelect
            label={"Age"}
            data={data.age}
            menuItems={[
                <MenuItem value={1}>{"< 20"}</MenuItem>,
                <MenuItem value={2}>20 - 30</MenuItem>,
                <MenuItem value={3}>{"30 - 40"}</MenuItem>,
                <MenuItem value={4}>{"> 40"}</MenuItem>,
            ]}
            onChange={handleChangeData}
        />,
    ];

    return (
        <Card
            sx={{
                maxWidth: 345,
                paddingBottom: `0px !important`,
                margin: 0,
                // background: `red`,
                marginBottom: 0,
                padding: `15px`,
                boxSizing: `border-box`,
                // borderBottom: `0.2px solid #000`,
                borderRadius: `none !important`,
                "&:hover": {
                    background: `rgba(168, 156, 138, 0.1)`,
                    borderBottom: `1px solid #000`,
                },
            }}
        >
            <CardContent
                sx={{
                    border: `none`,
                    position: `relative`,
                }}
            >
                {notification.isLoading ? (
                    <Box
                        sx={{
                            height: "300px !important",
                            position: `relative !important`,
                            // top: 200,
                            // left: -50,
                            // transform: `translate(-20%, -50%)`,
                        }}
                    >
                        <CircularProgress
                            sx={{
                                position: `absolute !important`,
                                top: `45%`,
                                left: `47%`,
                                transform: `translate(-2%, -50%)`,
                            }}
                        />
                    </Box>
                ) : (
                    <React.Fragment>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className={classes.question}
                        >
                            {notification.question}
                        </Typography>

                        {selectionSet}

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className={classes.question}
                            sx={{
                                fontSize: `13px !important`,
                                // textAlign: `right !important`,
                            }}
                        >
                            <Button
                                size="small"
                                sx={{
                                    color: "#000 !important",
                                    textTransform: `none`,
                                }}
                                onClick={() => handleClickQuestion()}
                            >
                                {notification.trait +
                                    " -> " +
                                    notification.facet +
                                    " -> " +
                                    notification.keyword}
                            </Button>
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                marginTop: `5px !important`,
                            }}
                            className={classes.notation}
                        >
                            Number User:{" "}
                            <span className={classes.values}>
                                {notification.numberUser}
                            </span>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{}}
                            className={classes.notation}
                        >
                            Total Answer:{" "}
                            <span className={classes.values}>
                                {notification.totalAnswer}
                            </span>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{}}
                            className={classes.notation}
                        >
                            Output Model:{" "}
                            <span className={classes.values}>
                                {notification.outputModel}
                            </span>
                        </Typography>
                        {notification.outputModel === "Right" ||
                        notification.outputModel === "Wrong" ? (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{}}
                                className={classes.notation}
                            >
                                <span className={classes.values}>
                                    {notification.outputModel === "Right"
                                        ? "The flow for this question is right!"
                                        : notification.outputModel === "Wrong"
                                        ? "The flow for this question is wrong!"
                                        : "?"}
                                </span>
                            </Typography>
                        ) : (
                            void 0
                        )}
                    </React.Fragment>
                )}
            </CardContent>
            <CardActions sx={{ marginTop: `-12px` }}>
                <Button size="small" onClick={handleGetOutputModelResult}>
                    Result
                </Button>
            </CardActions>
        </Card>
    );
}
