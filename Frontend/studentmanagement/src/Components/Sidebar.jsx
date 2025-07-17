import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Toolbar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../Auth/Features/Redux-Auth/UserSlicer";

const drawerWidth = 240;

// Drawer open style
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Drawer closed style
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Header spacer for Drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Styled AppBar with open support
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Styled Drawer with open support
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openMaster, setOpenMaster] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleClickMaster = () => setOpenMaster(!openMaster);
  const handleClickStaff = () => setOpenStaff(!openStaff);

  const handleList = (item) => {
    console.log(item);
    switch (item) {
      case "Role":
        navigate("/RoleMaster");
        break;
      case "Permission":
        navigate("/PermissionMaster");
        break;
      case "Staff":
        navigate("/StaffMaster");
        break;
      default:
        navigate("/StudentMaster");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Student Management
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <h6>Hello {user?.name ? user.name : user?.role}</h6>

          <IconButton color="inherit" onClick={() => dispatch(Logout())}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {user.role === "Super Admin" ? (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {/* Master Menu */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClickMaster}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Master" sx={{ opacity: open ? 1 : 0 }} />
                {open && (openMaster ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              <Collapse in={openMaster} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {["Permission", "Role"].map((subItem) => (
                    <ListItemButton
                      key={subItem}
                      sx={{ pl: 4 }}
                      onClick={() => handleList(subItem)}
                    >
                      <ListItemText primary={subItem} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>

            {/* Staff Menu */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClickStaff}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User" sx={{ opacity: open ? 1 : 0 }} />
                {open && (openStaff ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              <Collapse in={openStaff} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {["Staff", "Student"].map((subItem) => (
                    <ListItemButton
                      key={subItem}
                      sx={{ pl: 4 }}
                      onClick={() => handleList(subItem)}
                    >
                      <ListItemText primary={subItem} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          </List>
        </Drawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClickStaff}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User" sx={{ opacity: open ? 1 : 0 }} />
                {open && (openStaff ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              <Collapse in={openStaff} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {["Student"].map((subItem) => (
                    <ListItemButton
                      key={subItem}
                      sx={{ pl: 4 }}
                      onClick={() => handleList(subItem)}
                    >
                      <ListItemText primary={subItem} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          </List>
        </Drawer>
      )}
    </Box>
  );
}
