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
import { useDispatch, useSelector } from "react-redux";
import { TreeData } from "../../../../../../../../Config/data";
import MenuOptionPopup from "../../../Common/MenuOptionPopup";
import { Droppable } from "react-beautiful-dnd";
import { parse, stringify } from "query-string";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { mainTreeHandle } from "../../../../../../../../Redux/Features/MainTreeHandle/actions";
import CloseIcon from "@mui/icons-material/Close";
import {
    randomStringColor,
    randomStringMultiColor,
} from "../../../Common/color";
import { IRootState } from "../../../../../../../../Redux/Store/Reducers/combineReducers";

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
    facetSelected: TreeData[];
    facetCardDroppableId: string;
};

export default function FacetCard({
    className,
    id,
    facetSelected,
    facetCardDroppableId,
}: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const dispatch = useDispatch();

    const facetParentColor = useSelector(
        (state: IRootState) => state.mainTreeHandle.facetParentColor
    );

    // const addFacetToFacetCard = (facet) => {
    //     console.log("facet here:", facet);
    //     dispatch(mainTreeHandle.addFacetSelected.request(facet));
    // };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDeleteFacetSelected = (facet) => {
        dispatch(mainTreeHandle.deleteFacetSelected.request(facet));
    };

    // const handleAddToListContainer = (keyword) => {
    //     dispatch(mainTreeHandle.addListContainer.success(keyword));
    // };

    console.log("FacetCardDroppableId", facetCardDroppableId);

    const randomColors = randomStringMultiColor(2);

    return (
        <Droppable droppableId={facetCardDroppableId}>
            {(provided, snapshot) => {
                return (
                    <div>
                        <Card
                            className={
                                classes.facetCard +
                                " " +
                                (className ? className : "")
                            }
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{
                                marginTop: `15px`,
                                backgroundImage:
                                    snapshot.isDraggingOver &&
                                    "linear-gradient(45deg, rgba(100, 149, 237, 0.5), rgba(100, 149, 237, 0.3))",
                            }}
                            id={id ? id : ""}
                        >
                            <CardContent sx={{ textAlign: `left` }}>
                                {facetSelected.length ? (
                                    facetSelected.map((facet, i) => {
                                        if (i < 1)
                                            return (
                                                <React.Fragment key={facet.id}>
                                                    <MenuOptionPopup
                                                        key={facet.id}
                                                        onDelete={() =>
                                                            handleDeleteFacetSelected(
                                                                facet
                                                            )
                                                        }
                                                        facet={facet}
                                                        onAdd={undefined}
                                                        children={(
                                                            popupState
                                                        ) => {
                                                            return (
                                                                <React.Fragment>
                                                                    <Button
                                                                        variant="contained"
                                                                        {...bindTrigger(
                                                                            popupState
                                                                        )}
                                                                        // color={
                                                                        //     randomColors[0] as any
                                                                        // }
                                                                        color={
                                                                            facetParentColor.color
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="text.secondary"
                                                                            sx={{
                                                                                fontSize: `16px`,
                                                                                fontWeight:
                                                                                    "bold",
                                                                                cursor: `pointer`,
                                                                                color: `#FFF`,
                                                                            }}
                                                                            align={
                                                                                "center"
                                                                            }
                                                                        >
                                                                            {
                                                                                facet.parentTitle as any
                                                                            }
                                                                        </Typography>
                                                                    </Button>

                                                                    <Button
                                                                        {...bindTrigger(
                                                                            popupState
                                                                        )}
                                                                        sx={{
                                                                            margin: `0 12px`,
                                                                        }}
                                                                        // variant="outlined"
                                                                        color="warning"
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="text.secondary"
                                                                            sx={{
                                                                                cursor: `pointer`,
                                                                                color: `#FFF`,
                                                                                padding: 0,
                                                                            }}
                                                                            align={
                                                                                "center"
                                                                            }
                                                                        >
                                                                            <ArrowForwardIcon
                                                                                sx={{
                                                                                    fontSize: `19px`,
                                                                                    // color: `secondary`,
                                                                                    marginTop: `4px`,
                                                                                }}
                                                                                color="action"
                                                                            />
                                                                        </Typography>
                                                                    </Button>

                                                                    <Button
                                                                        variant="contained"
                                                                        {...bindTrigger(
                                                                            popupState
                                                                        )}
                                                                        sx={{
                                                                            background: `cornflowerblue`,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="text.secondary"
                                                                            sx={{
                                                                                fontSize: `16px`,
                                                                                fontWeight:
                                                                                    "bold",
                                                                                cursor: `pointer`,
                                                                                color: `#FFF`,
                                                                            }}
                                                                            align={
                                                                                "center"
                                                                            }
                                                                        >
                                                                            {
                                                                                facet.title
                                                                            }
                                                                        </Typography>
                                                                        <CloseIcon
                                                                            sx={{
                                                                                // background: `cornflowerblue !important`,
                                                                                background: `#FFF !important`,
                                                                                position: `absolute`,
                                                                                right: -12,
                                                                                top: -13,
                                                                                zIndex: 10,
                                                                                color: `#000`,
                                                                                "&:hover":
                                                                                    {
                                                                                        backgroundImage: `linear-gradient(45deg, cornflowerblue 15%, #00d4ff) !important`,
                                                                                        color: `#FFFFFF`,
                                                                                    },
                                                                                borderRadius: `50%`,
                                                                                padding: `5px`,
                                                                                fontSize: `12px`,
                                                                                // color="white"
                                                                            }}
                                                                            // color="white"
                                                                        />
                                                                    </Button>
                                                                </React.Fragment>
                                                            );
                                                        }}
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
                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
}
