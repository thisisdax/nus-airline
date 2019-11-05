import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DetailList from '../../components/DetailList';

class Details extends React.Component {
  state = {
    details: {},
    seats: [],
  };

  componentDidMount() {
    console.log(this.props.match);
    axios.get(`http://localhost:3000/flight/explore/details?schedule_id=${this.props.match.params.schedule_id}&flight_schedule_id=${this.props.match.params.flight_schedule_id}`)
    .then(data => {
      if (data.data.length > 0) {
        this.setState({
          details: {
            ...data.data[0],
          },
        });
      }
    });
    axios.get(`http://localhost:3000/flight/explore/details/seats?flight_schedule_id=${this.props.match.params.flight_schedule_id}`)
    .then(data => {
      console.log(data);
      this.setState({
        seats: data.data,
      });
    });
  }
  render() {
    return (
      <PaperSheet
        details={this.state.details}
        seats={this.state.seats}
      />
    );
  }
}

export default withRouter(Details);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

function PaperSheet(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Flight Details
      </Typography>
      <DetailList
        {...props}
      />
    </Paper>
  );
}