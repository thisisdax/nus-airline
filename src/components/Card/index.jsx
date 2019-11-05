import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
  card: {
    maxWidth: 120,
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: '0 auto',
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [booked, setBooked] = useState(props.seat.availability);

  const handleOnClick = (e) => {
    setBooked(!booked);
    e.preventDefault();
    axios.post('http://localhost:3000/booking/add',
    {
      seat_id: props.seat.seat_id,
      flight_schedule_id: props.seat.flight_schedule_id
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.token,
      },
    }).then(data => {
      console.log(data);
    });
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Seat Number
        </Typography>
        <Typography variant="h5" component="h2">
          {props.seat.seat_id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.seat.availability ? 'Available' : 'Booked'}
        </Typography>
      </CardContent>
      <CardActions>
        {console.log(booked)}
        <Button disabled={!booked} className={classes.button} size="small" onClick={handleOnClick}>Book Seat</Button>
      </CardActions>
    </Card>
  );
}