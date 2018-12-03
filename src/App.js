import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import _ from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: makeData(100000)
    };
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (

      <ReactTable
          data={data}
          filterable
          columns={[
            {
              Header: "First Name",
              accessor: "firstName"
            },
            {
              Header: "Last Name",
              accessor: "lastName"
            },
            {
              Header: "Age",
              accessor: "age"
            },
            {
              Header: "Over 21",
              accessor: "age",
              id: "over",
              Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
              filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                if (filter.value === "true") {
                  return row[filter.id] >= 21;
                }
                return row[filter.id] < 21;
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "all"}
                >
                  <option value="all">Show All</option>
                  <option value="true">Can Drink</option>
                  <option value="false">Can't Drink</option>
                </select>
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />


    );
  }
}

export default App;
