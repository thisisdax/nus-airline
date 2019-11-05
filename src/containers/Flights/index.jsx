import React from 'react';
import Table from '../../components/SimpleTable/FlightTable.jsx';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Flights extends React.Component {
  state = {
    rows: [],
    headCells: [],
    from: '',
    to: '',
  }

  componentDidMount() {
    axios.get('http://localhost:3000/flight/explore').then(data => {
      this.setState({
        rows: data.data.rows,
        headCells: data.data.fields.map((field, index)=>{
          if (index===0) {
            return {
              id: field.name,
              numeric: false,
              disablePadding: true,
              label: field.name,
            }
          } else {
            return {
              id: field.name,
              numeric: true,
              disablePadding: false,
              label: field.name,
            }
          }
          
        }),
      }, ()=>{
        console.log(this.state);
      })
    })
  }

  search = () => {
    // axios.get('')
    console.log('clicked')
    console.log(this.state);
    axios.get('http://localhost:3000/flight/explore', { params: { from: this.state.from, to: this.state.to } })
    .then((data) => {
      this.setState({
        rows: data.data
      })
      console.log(data);
    });
  }

  onInputChangeFrom = (e) => {
    this.setState({
      from: e.target.value,
    });
  }

  onInputChangeTo = (e) => {
    this.setState({
      to: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Paper>
          <div style={{ textAlign: 'center'}}>
            <TextField
              id="to"
              label="to"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.to}
              onChange={this.onInputChangeTo}
            />
            <TextField
              id="from"
              label="from"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.from}
              onChange={this.onInputChangeFrom}
            />
            <Button
              onClick={this.search}
              color="primary"
              variant="contained"
              margin="normal"
              style={{ marginTop: 25 }}
            >
              Search
            </Button>
          </div>
        </Paper>
        <Table
          rows={this.state.rows}
          headCells={this.state.headCells}
          primaryKey={'primary_key'}
          title={'Flights'}
        />
      </div>
    )
  }
};