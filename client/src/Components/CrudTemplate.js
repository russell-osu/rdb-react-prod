import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';


class CrudTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = { records: [] };
  }


  componentDidMount() {
    this.loadTable();
  }

  loadTable = async () => {
    //const result = await fetch('/restaurant', {
    const result = await fetch(this.props.endpoint, {
      accept: 'application/json',
    });
    const result_1 = await result.json();
    this.setState({
      //records: [...result_1.restaurant]
      records: [...result_1[this.props.entity]]
    });
  }



  addRowOnClient = newRow => {
    this.setState({
      records: [...this.state.records, newRow]
    });
  }

  deleteRowOnClient = index => {
    const { records } = this.state;

    this.setState({
      records: records.filter((record, i) => {
        return i !== index;
      })
    });
  }

  deleteRecord = (id, index) => {
    return fetch(this.props.entity + '/' + id, {
      method: 'delete'
    }).then(response => response.json())
      .then(response => console.log(JSON.stringify(response)))
      //.then(this.loadTable())
      .then(this.deleteRowOnClient(index))
      .catch(error => console.error(error));

  }
  
  handleSubmit = async record => {
    fetch(this.props.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    })
    //.then(this.addRowOnClient(record))
    .then(setTimeout(() => {this.loadTable();}, 500 ))
    .catch(error => console.error(error));
  }

  render() {
        //const { records, tableHeaders, entityFields, fieldNames, fieldTypes } = this.state;
        const { records } = this.state;

        return (

          <div className = "container">

              <Form
                entity = {this.props.entity}
                handleSubmit = {this.handleSubmit}
                entityFields = {this.props.entityFields}
                fieldLabels = {this.props.fieldLabels}
                fieldNames = {this.props.fieldNames}
                fieldTypes = {this.props.fieldTypes}
                dropdownFields = {this.props.dropdownFields}
              />

            <Table
               records = {records}
               deleteRecord = {this.deleteRecord}
               tableHeaders = {this.props.tableHeaders}
             />

          </div>
        );
  }
}

export default CrudTemplate;
