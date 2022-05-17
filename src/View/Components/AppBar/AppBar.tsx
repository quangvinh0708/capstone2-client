import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { url } from "inspector";
import NotificationContainer from "../NotificationContainer/NotificationContainer";
import { useStyles } from "./styles";
import { mainTreeHandle } from "../../../Redux/Features/MainTreeHandle/actions";
import { useDispatch } from "react-redux";
import { IRootState } from "../../../Redux/Store/Reducers/combineReducers";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import CustomSearchBar from "../../Commons/CustomSearchBar/CustomSearchBar";
import QuestionProcessingModal from "../../Commons/QuestionProcessingModal/QuestionProcessingModal";
import {
    Container,
    Question as QuestionType,
} from "../../../Redux/Features/MainTreeHandle/reducer";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const notifications = useSelector(
        (state: IRootState) => state.mainTreeHandle.notifications
    );

    const isNotificationsLoading = useSelector(
        (state: IRootState) => state.mainTreeHandle.isNotificationsLoading
    );

    const [searchText, setSearchText] = React.useState<string>("");

    const [currentSuggestQuestion, setCurrentSuggestQuestion] = React.useState<
        (QuestionType & Container) | undefined
    >(undefined);

    console.log(
        "--------------------------------------------------------",
        currentSuggestQuestion
    );

    const handleClickQuestion = (question) => {
        setCurrentSuggestQuestion(question);
        dispatch(mainTreeHandle.openQuestionProcessingModal.success(true));
    };

    let notificationsAfterSearch: any[] = [];
    notifications.forEach((n) => {
        if (n.question.toUpperCase().indexOf(searchText.toUpperCase()) === -1) {
            return;
        }
        notificationsAfterSearch.push(n);
    });

    const classes = useStyles();

    const dispatch = useDispatch();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        dispatch(mainTreeHandle.getNotificationAction.request({}));
    };
    const handleProfileMobileMenuOpen = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
        dispatch(mainTreeHandle.getNotificationAction.request({}));
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
        setSearchText("");
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        setSearchText("");
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleGetOutputModelResult = (data) => {
        dispatch(mainTreeHandle.getOutputModelResult.request(data));
    };

    const handleChangeSearchText = (e) => {
        setSearchText(e.target.value);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                "& ul": {
                    border: `none`,
                    padding: 0,
                },
                // position: `relative !important`,
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                className={classes.notificationHeading}
            >
                Notification
            </Typography>
            <CustomSearchBar
                searchText={searchText}
                onChangeSearchText={handleChangeSearchText}
            />
            {!isNotificationsLoading && notificationsAfterSearch.length ? (
                notificationsAfterSearch.map((notification) => {
                    return (
                        <NotificationContainer
                            key={notification.id}
                            notification={notification}
                            onGetOutputModelResult={handleGetOutputModelResult}
                            onClickQuestion={handleClickQuestion}
                        />
                    );
                })
            ) : !notificationsAfterSearch.length && !isNotificationsLoading ? (
                <Box
                    sx={{
                        height: `400px`,
                        width: 345,
                        position: `relative !important`,
                    }}
                ></Box>
            ) : (
                <Box
                    sx={{
                        height: `400px`,
                        width: 345,
                        position: `relative !important`,
                        // top: 200,
                        // left: -50,
                        // transform: `translate(-20%, -50%)`,
                    }}
                >
                    <CircularProgress
                        sx={{
                            position: `absolute !important`,
                            top: `40%`,
                            left: `45%`,
                            transform: `translate(-20%, -50%)`,
                        }}
                    />
                </Box>
            )}
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={(e) => handleProfileMobileMenuOpen(e)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box
            sx={{
                flexGrow: 1,
                // background: `rgba(83, 218, 67, 1)`
                backgroundImage: `url(https://ak.picdn.net/shutterstock/videos/10205426/thumb/1.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `cover`,
                backgroundPosition: `right center`,
                padding: 0,
            }}
        >
            <AppBar
                position="static"
                sx={{
                    // background: `#53da43 !important`,
                    background: `rgba(0, 0, 0, 0.5) !important`,
                    // background: `none !important`,
                    // backgroundImage: `linear-gradient(45deg, cornflowerblue 15%, #00d4ff)`,
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            fontFamily: `'Noto Sans', sans-serif !important`,
                            // fontSize: `21px`,
                        }}
                    >
                        Green BigFive
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            {currentSuggestQuestion && (
                <QuestionProcessingModal
                    currentSuggestQuestion={currentSuggestQuestion}
                    onClickQuestion={handleClickQuestion}
                    find={{ isQuestions: true }}
                />
            )}
        </Box>
    );
}
