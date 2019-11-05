import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import FlightIcon from '@material-ui/icons/Flight';
import ExploreIcon from '@material-ui/icons/Explore';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <MenuItem component={Link} to={'/explore'} button key={'Explore'}>
            <ListItemIcon>
              <ExploreIcon/>
            </ListItemIcon>
            <ListItemText primary={'Explore'} />
          </MenuItem>
          <MenuItem component={Link} to={'/booking'} button key={'Booking'}>
            <ListItemIcon>
              <LoyaltyIcon/>
            </ListItemIcon>
            <ListItemText primary={'Booking'} />
          </MenuItem>
          <MenuItem component={Link} to={'/flights'} button key={'Flights'}>
            <ListItemIcon>
              <FlightIcon/>
            </ListItemIcon>
            <ListItemText primary={'Flights'} />
          </MenuItem>
          <MenuItem component={Link} to={'/membership'} button key={'Membership'}>
            <ListItemIcon>
              <CardMembershipIcon/>
            </ListItemIcon>
            <ListItemText primary={'Membership'} />
          </MenuItem>
          {displayAdminMenu()}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

const displayAdminMenu = () => {
  if ((localStorage.isAdmin - 1) === 0) {
    return (
      <MenuItem component={Link} to={'/admin'} button key={'Admin'}>
        <ListItemIcon>
          <SupervisorAccountIcon/>
        </ListItemIcon>
        <ListItemText primary={'Admin'} />
      </MenuItem>
    )
  }
  return null;
}