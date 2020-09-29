import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 250;

const style = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  paper: {
    background: '#edf4ff'
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#f16821",
      zIndex:99
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  sidebarText: {
    fontFamily: "SFUIDisplay",
    marginLeft: -14,
    fontSize: 15
  },
  sidebar: {
    color: "#888888",
    height: 50
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingBottom: 0
  },
  logosgu: {
    objectFit: "contain",
    textAlign: "center"
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-13%",
    // marginBottom: "15%"
  },
  menuIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  active: {
    backgroundColor: '#edf4ff'
  },
  noActive: {}
}));

export default style