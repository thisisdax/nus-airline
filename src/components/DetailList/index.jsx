import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '../Card';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  // root: {
  //   width: '100%',
  //   backgroundColor: theme.palette.background.paper,
  // },
  inline: {
    display: 'inline',
  },
  item: {
    maxWidth : 500,
  }
}));

function AlignItemsList(props) {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          className={classes.item}
          primary={'Schedule'}
          secondary={
            <React.Fragment>
              {props.details.schedule_id}
            </React.Fragment>
          }
        />
        <ListItemText
          className={classes.item}
          primary={'Flight Schedule'}
          secondary={
            <React.Fragment>
              {props.details.flight_schedule_id}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          className={classes.item}
          primary={'Destination'}
          secondary={
            <React.Fragment>
              {props.details.arrival_airport}
            </React.Fragment>
          }
        />
        <ListItemText
          className={classes.item}
          primary={'Arrival Time'}
          secondary={
            <React.Fragment>
              {props.details.arrival_datetime}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          className={classes.item}
          primary={'Departure'}
          secondary={
            <React.Fragment>
              {props.details.depart_airport}
            </React.Fragment>
          }
        />
        <ListItemText
          className={classes.item}
          primary={'Departure Time'}
          secondary={
            <React.Fragment>
              {props.details.depart_datetime}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          className={classes.item}
          primary={'Price'}
          secondary={
            <React.Fragment>
              {props.details.price}
            </React.Fragment>
          }
        />
      </ListItem>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {props.seats.map((seat) => {
              return ( 
                <Grid key={seat.seat_id} item>
                  <Card
                    seat={seat}
                    raised
                    elevation={11}
                  />
                </Grid>
              ); 
            })}
          </Grid>
        </Grid>
      </Grid>
      <br/>
      <Divider component="li" />
      <Button
        onClick={() => {
          props.history.goBack()
        }}
      >
        Back
      </Button>
    </List>
  );
}

export default withRouter(AlignItemsList);