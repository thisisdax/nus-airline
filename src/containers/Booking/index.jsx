import React from 'react';
import axios from 'axios';
import Table from '../../components/SimpleTable/BookingTable.jsx';

export default class Booking extends React.Component {
  state = {
    rows: [],
    headCells: [],
  }
  componentDidMount() {
    axios.get('http://localhost:3000/booking/list',
      { 
        headers: {
          Authorization: 'Bearer ' + localStorage.token,
        }
      }
    ).then(data => {
      const fieldname = data.data.fields.map(field => {
        return field.name;
      })
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
        })
      }); 
    });
  }

  render() {
    return (
      <div>
        <Table
          rows={this.state.rows}
          headCells={this.state.headCells}
          primaryKey={'primary_key'}
          title={'Bookings'}
        />
      </div>
    )
  }
};