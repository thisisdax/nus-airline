import React from 'react';
import Table from '../../components/SimpleTable/AdminTable.jsx';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Admin extends React.Component {
  state = {
    rows: [],
    headCells: [],
    from: '',
    to: '',
  }

  componentDidMount() {
    axios.get('http://localhost:3000/admin/searchflight', { headers: {
      Authorization: 'Bearer ' + localStorage.token,
    }}).then(data => {
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
      });
    });
  }

  search = () => {
    axios.get('http://localhost:3000/admin/searchflight',
    {
      params: {
        aircraft_id: this.state.aircraft, flight_id: this.state.flight
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.token,
      },
    })
    .then((data) => {
      this.setState({
        rows: data.data.rows
      })
      console.log(data);
    });
  }
  
  create = () => {
    axios.post('http://localhost:3000/admin/createflight',
    { aircraft_id: this.state.aircraft, flight_id: this.state.flight },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.token,
      },
    })
    .then((data) => {
      this.setState({
        rows: data.data.rows
      })
      console.log(data);
    });
  }

  update = () => {
    axios.put('http://localhost:3000/admin/updateflight',
    { aircraft_id: this.state.aircraft, flight_id: this.state.flight },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.token,
      },
    })
    .then((data) => {
      this.setState({
        rows: data.data.rows
      })
      console.log(data);
    });
  }

  delete = () => {
    axios.delete('http://localhost:3000/admin/deleteflight',
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.token,
      },
      data: { aircraft_id: this.state.aircraft, flight_id: this.state.flight },
    })
    .then((data) => {
      this.setState({
        rows: data.data.rows
      })
      console.log(data);
    });
  }

  onInputChangeAircraft = (e) => {
    this.setState({
      aircraft: e.target.value,
    });
  }

  onInputChangeFlight = (e) => {
    this.setState({
      flight: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Paper>
          <div style={{ textAlign: 'center'}}>
            <TextField
              id="flight"
              label="flight"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.flight}
              onChange={this.onInputChangeFlight}
            />
            <TextField
              id="aircraft"
              label="aircraft"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.aircraft}
              onChange={this.onInputChangeAircraft}
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
            <Button
              onClick={this.create}
              color="primary"
              variant="contained"
              margin="normal"
              style={{ marginTop: 25 }}
            >
              Create
            </Button>
            <Button
              onClick={this.update}
              color="primary"
              variant="contained"
              margin="normal"
              style={{ marginTop: 25 }}
            >
              Update
            </Button>
            <Button
              onClick={this.delete}
              color="primary"
              variant="contained"
              margin="normal"
              style={{ marginTop: 25 }}
            >
              Delete
            </Button>
          </div>
        </Paper>
        {/* <Paper>
          <div style={{ textAlign: 'center'}}>
            <TextField
              id="create_flight"
              label="create_flight"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.flight}
              onChange={this.onInputCreateFlight}
            />
            <TextField
              id="create_aircraft"
              label="create_aircraft"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.aircraft}
              onChange={this.onInputCreateAircraft}
            />
            <Button
              onClick={this.create}
              color="primary"
              variant="contained"
              margin="normal"
              style={{ marginTop: 25 }}
            >
              Create
            </Button>
          </div>
        </Paper>
        <Paper>
          <div style={{ textAlign: 'center'}}>
            <TextField
              id="update_flight"
              label="update_flight"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.flight}
              onChange={this.onInputUpdateFlight}
            />
            <TextField
              id="update_aircraft"
              label="update_aircraft"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.aircraft}
              onChange={this.onInputUpdateAircraft}
            />
            <Button
              onClick={this.update}
              color="primary"
              variant="contained"
              margin="normal"
              style={{ marginTop: 25 }}
            >
              Update
            </Button>
          </div>
        </Paper>
        <Paper>
          <div style={{ textAlign: 'center'}}>
            <TextField
              id="delete_flight"
              label="delete_flight"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.flight}
              onChange={this.onInputDeleteFlight}
            />
            <TextField
              id="delete_aircraft"
              label="delete_aircraft"
              margin="normal"
              variant="outlined"
              style={{ marginRight: 100 }}
              value={this.state.aircraft}
              onChange={this.onInputDeleteAircraft}
            />
            <Button
              onClick={this.delete}
              color="primary"
              variant="contained"
              margin="normal"
              style={{ marginTop: 25 }}
            >
              Delete
            </Button>
          </div>
        </Paper> */}
        <Table
          rows={this.state.rows}
          headCells={this.state.headCells}
          primaryKey={'flight_id'}
          title={'Flights(Admin)'}
          disableClick
        />
      </div>
    )
  }
};