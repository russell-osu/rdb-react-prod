import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import UpdateForm from './UpdateForm';


class CrudTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      records: [],
      updating: false,
      restaurantNames: [],
      userNames: [],
      menuItemNames: [],
      cuisineNames: []

    };
    this.currRecord = {};
    this.updateFields = this.props.entityFields;
    // this.restaurantNames = [];
    // this.userNames = [];
		// this.menuItemNames = [];
    // this.cuisineNames = [];

    
  }


  async componentDidMount() {

    const { dropdownFields } = this.props;

    if(dropdownFields.includes("restaurant_id"))
       this.fetchRestaurantNames();

    if(dropdownFields.includes("user_id"))
			this.fetchUserNames();

		if(dropdownFields.includes("menu_item_id"))
			this.fetchMenuItemNames();

		if(dropdownFields.includes("cuisine_id"))
			this.fetchCuisineNames();

    this.loadTable();
  }

  loadTable = async () => {
    const result = await fetch(this.props.endpoint, {
      accept: 'application/json',
    });
    const result_1 = await result.json();
    this.setState({
      records: [...result_1[this.props.entity]]
    });
  }

  fetchRestaurantNames = async () => {
		const result = await fetch("/restaurant_review/restaurant/names", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
    //return [...result_1.restaurantNames];
    this.setState({
      restaurantNames: [...result_1.restaurantNames]
    });
  }
  
  fetchUserNames = async () => {
		const result = await fetch("/restaurant_review/user", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
    //return [...result_1.user];
    this.setState({
      userNames: [...result_1.user]
    });
	}

	fetchMenuItemNames = async () => {
		const result = await fetch("/restaurant_review/menu_item/names", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
    //return [...result_1.menu_item];
    this.setState({
      menuItemNames: [...result_1.menu_item]
    });
	}

	fetchCuisineNames = async () => {
		const result = await fetch("/restaurant_review/cuisine", {
		  accept: 'application/json',
		});
        const result_1 = await result.json();
    //return [...result_1.cuisine];
    this.setState({
      cuisineNames: [...result_1.cuisine]
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

  updateRecord = async (record, index) => {
    this.currRecord = record;

    for(var field in this.currRecord) {
        if(this.updateFields.hasOwnProperty(field)){
            this.updateFields[field] = this.currRecord[field];
        }
    }
    this.setState({ updating: true});

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
    .then(response => console.log("server: " + response))
    //.then(this.addRowOnClient(record))
    .then(setTimeout(() => {this.loadTable();}, 500 ))
    .catch(error => console.error(error));
  }



  handleUpdateSubmit = async record => {
    fetch(this.props.endpoint + '/' + record.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    })
    //.then(this.addRowOnClient(record))
    .then(setTimeout(() => {this.loadTable();}, 500 ))
    .then(() => {
      for(var field in this.updateFields){
        this.updateFields[field] = '';
      }
    })
    .then(() => {this.setState({ updating: false});})
    .catch(error => console.error(error));
  }

  render() {
        //const { records, tableHeaders, entityFields, fieldNames, fieldTypes } = this.state;
        const { records, updating } = this.state;

        if (updating){

          return (
            <div className = "container">
              <UpdateForm
                entity = {this.props.entity}
                handleSubmit = {this.handleUpdateSubmit}
                entityFields = {this.updateFields}
                fieldLabels = {this.props.fieldLabels}
                fieldNames = {this.props.fieldNames}
                fieldTypes = {this.props.fieldTypes}
                dropdownFields = {this.props.dropdownFields}
                currRecord = {this.currRecord}
                restaurantNames = {this.state.restaurantNames}
                userNames = {this.state.userNames}
                menuItemNames = {this.state.menuItemNames}
                cuisineNames = {this.state.cuisineNames}
              />
            </div>
          );
        }

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
                restaurantNames = {this.state.restaurantNames}
                userNames = {this.state.userNames}
                menuItemNames = {this.state.menuItemNames}
                cuisineNames = {this.state.cuisineNames}
              />

              <Table
                records = {records}
                deleteRecord = {this.deleteRecord}
                updateRecord = {this.updateRecord}
                tableHeaders = {this.props.tableHeaders}
                restaurantNames = {this.state.restaurantNames}
                userNames = {this.state.userNames}
                menuItemNames = {this.state.menuItemNames}
                cuisineNames = {this.state.cuisineNames}
              />

          </div>
        );

  }
}

export default CrudTemplate;
