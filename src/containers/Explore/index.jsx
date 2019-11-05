import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import ExploreCard from '../../components/ExploreCard';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '../../components/Table';

export default class Explore extends React.Component {
  state = {
    popular: [],
    profitable: [],
  };

  componentDidMount() {
    axios.get('http://localhost:3000/popular').then(data=>{
      this.setState({
        popular: data.data,
      })
    })

    axios.get('http://localhost:3000/profitable').then(data=>{
      this.setState({
        profitable: data.data,
      })
    })
  }

  render() {
    return (
      <div>
        <Paper>
          <Typography gutterBottom variant="h4" component="h2">
            Most Popular Destination
          </Typography>
          <Grid container spacing={3}>
            {this.state.popular.map(item => {
              return (
                <Grid item xs={3}>
                  <ExploreCard
                    title={item.arrival_airport}
                    description={`Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit!
                      Curabitur ultricies ex neque!
                      Cras pulvinar felis in risus feugiat sodales vitae.`
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
        <Paper>
          <Typography gutterBottom variant="h4" component="h2">
            Must Visit Destination
          </Typography>
          <Grid container spacing={3}>
            {this.state.popular.map(item => {
              return (
                <Grid item xs={3}>
                  <ExploreCard
                    title={item.arrival_airport}
                    description={`Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit!
                      Curabitur ultricies ex neque!
                      Cras pulvinar felis in risus feugiat sodales vitae.`
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </div>
    )
  }
};
