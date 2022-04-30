import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStyles } from "./styles";
import { useDrop } from "react-dnd";
import { IRootState } from "../../../../../Redux/Store/Reducers/combineReducers";
import { useDispatch, useSelector } from "react-redux";
import { mainTreeHandle } from "../../../../../Redux/Features/MainTreeHandle/actions";
import MenuOption from "../../../../Commons/MenuOption/MenuOption";
import { Facet } from "../../../../../Config/data";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

type Props = {
    className: string;
    id: string;
    facetSelected: Facet[];
    addFacetToFacetCard: any;
};

export default function FacetCard({
    className,
    id,
    facetSelected,
    addFacetToFacetCard,
}: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const dispatch = useDispatch();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "facet",
        drop: (item) => addFacetToFacetCard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    // const addFacetToFacetCard = (facet) => {
    //     console.log("facet here:", facet);
    //     dispatch(mainTreeHandle.addFacetSelected.request(facet));
    // };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDeleteFacetSelected = (facet) => {
        dispatch(mainTreeHandle.deleteFacetSelected.success(facet));
    };

    // const handleAddToListContainer = (keyword) => {
    //     dispatch(mainTreeHandle.addListContainer.success(keyword));
    // };

    return (
        <Card
            className={classes.facetCard + " " + (className ? className : "")}
            sx={{ marginTop: `15px` }}
            ref={drop}
            id={id ? id : ""}
        >
            <CardContent>
                {facetSelected.length ? (
                    facetSelected.map((facet, i) => {
                        if (i < 1)
                            return (
                                <React.Fragment key={facet.id}>
                                    <MenuOption
                                        key={facet.id}
                                        stateSelected={facetSelected}
                                        onDelete={() =>
                                            handleDeleteFacetSelected(facet)
                                        }
                                        onAdd={undefined}
                                        children={
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    fontSize: `16px`,
                                                    fontWeight: "bold",
                                                    cursor: `pointer`,
                                                }}
                                                align={"center"}
                                            >
                                                <span>{facet.label}</span>
                                            </Typography>
                                        }
                                    />
                                </React.Fragment>
                            );
                    })
                ) : (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: `16px`,
                            fontWeight: "bold",
                            cursor: `pointer`,
                        }}
                        align={"center"}
                    >
                        <span>{"Move Facet Here..."}</span>
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
