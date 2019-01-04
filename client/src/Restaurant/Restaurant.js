import React, { Component } from 'react';
import Table from './Table';
import RestForm from './RestForm';


class Restaurant extends Component {

  state = {
    restaurants: []
  };

  componentDidMount() {
    this.loadTable();
  }

  loadTable = () => {
    return fetch('/restaurant', {
      accept: 'application/json',

    }).then(result => result.json())
      .then(result => {
        this.setState({
          restaurants: [...result.restaurant]
        })

      });
  }

  deleteRowOnClient = index => {
    const { restaurants } = this.state;

    this.setState({
      restaurants: restaurants.filter((restaurant, i) => {
        return i !== index;
      })
    });
  }

  removeRestaurant = (id, index) => {
    return fetch('/restaurant/' + id, {
      method: 'delete'
    }).then(response => response.json())
      .then(response => console.log(JSON.stringify(response)))
      //.then(this.loadTable())
      .then(this.deleteRowOnClient(index))
      .catch(error => console.error(error));

  }
  
  handleSubmit = restaurant => {
    console.log(restaurant);
    console.log(JSON.stringify(restaurant));
    return fetch('/restaurant', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restaurant)
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    // .then(this.setState({
    //   restaurants: [...this.state.restaurants, restaurant]
    // }))
    .then(this.loadTable())
    .catch(error => console.error(error));
  }

  render() {
        const { restaurants } = this.state;

        return (

          <div className = "container">

            <Table
               restaurantData = {restaurants}
               removeRestaurant = {this.removeRestaurant}
             />

             <RestForm
                handleSubmit = {this.handleSubmit}
              />

          </div>
        );
  }
}

export default Restaurant;
