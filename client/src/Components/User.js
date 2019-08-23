import React, { Component } from 'react';
// import Table from './Table';
// import RestForm from './RestForm';  


class User extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    this.loadTable();
  }

  loadTable = async () => {
    const result = await fetch('/user', {
      accept: 'application/json',
    });
    const result_1 = await result.json();
    this.setState({
      users: [...result_1.user]
    });
  }

  deleteRowOnClient = index => {
    const { users } = this.state;

    this.setState({
      users: users.filter((user, i) => {
        return i !== index;
      })
    });
  }

  removeUser = (id, index) => {
    return fetch('/user/' + id, {
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

export default User;
