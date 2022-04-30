import { Card, CardContent, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Keyword } from "../../../../../Config/data";
import { mainTreeHandle } from "../../../../../Redux/Features/MainTreeHandle/actions";
import { IRootState } from "../../../../../Redux/Store/Reducers/combineReducers";
import MenuOption from "../../../../Commons/MenuOption/MenuOption";
import { useStyles } from "./styles";

type Props = {
    className?: string;
    id?: string;
    keywordSelected: Keyword[];
};

const KeywordCard = ({ className, id, keywordSelected }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const keywordSelected = useSelector(
    //     (state: IRootState) => state.mainTreeHandle.keywordSelected
    // );

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "keyword",
        drop: (item) => addKeywordToKeywordCard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addKeywordToKeywordCard = (keyword) => {
        dispatch(mainTreeHandle.addKeywordSelected.request(keyword));
    };

    const handleDeleteKeywordSelected = (keyword) => {
        dispatch(mainTreeHandle.deleteKeywordSelected.success(keyword));
    };

    const handleAddToListContainer = (keyword) => {
        dispatch(mainTreeHandle.addListContainer.request(keyword));
    };

    return (
        <Fragment>
            <Card
                className={
                    classes.keywordCard + " " + (className ? className : "")
                }
                sx={{
                    margin: `70px 0 0 15px`,
                    float: `left`,
                }}
                ref={drop}
                id={id ? id : ""}
            >
                {/* <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            /> */}
                {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}
                <CardContent>
                    {keywordSelected.length > 0 ? (
                        keywordSelected.map((keyword) => (
                            <MenuOption
                                key={keyword.id}
                                stateSelected={keywordSelected}
                                onDelete={() =>
                                    handleDeleteKeywordSelected(keyword)
                                }
                                id={keyword.id}
                                onAdd={() => handleAddToListContainer(keyword)}
                                children={
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: `16px`,
                                            fontWeight: "bold",
                                            cursor: `pointer`,
                                            display: `flex`,
                                            flexDirection: `column`,
                                        }}
                                        align={"center"}
                                    >
                                        <span>{keyword.label}</span>
                                    </Typography>
                                }
                            />
                        ))
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: `16px`,
                                fontWeight: "bold",
                                cursor: `pointer`,
                                display: `flex`,
                                flexDirection: `column`,
                            }}
                            align={"center"}
                        >
                            <span>{"Move Keyword Here..."}</span>
                        </Typography>
                    )}
                </CardContent>
                {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions> */}
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                    </Typography>
                </CardContent>
            </Collapse> */}
            </Card>
            <div style={{ content: "", clear: `both`, display: `table` }}></div>
        </Fragment>
    );
};

export default KeywordCard;
