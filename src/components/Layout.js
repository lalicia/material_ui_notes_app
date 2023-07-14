import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import { format } from "date-fns";
import { purple } from "@mui/material/colors";

//might reuse thise elsewhere
const drawerWidth = 200;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    //this one makes it so components sit next to one another and drawer doesn't overlap the rest of the stuff
    root: {
      display: "flex",
    },
    title: {
      padding: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

function Layout() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  //drawer items
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar - Toolbar is what gives the AppBar spacing, height etc */}
      <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)` }} elevation={0}>
        <Toolbar sx={{ bgcolor: "#fefefe", color: "text.primary" }}>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src="/mario-av.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Ninja Notes
          </Typography>
        </div>

        {/* list / links */}
        <List>
          {menuItems.map((item) => {
            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor:
                    location.pathname == item.path ? "#f4f4f4" : null,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>

      <div className={classes.page}>
        {/* This div with this class is what pushes the content under the AppBar and stops it rendering over the top} */}
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
