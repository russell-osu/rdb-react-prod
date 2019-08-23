import React, { Component } from 'react';

class Form extends Component {
	constructor(props) {
		super(props)

		this.initialState = props.entityFields;
		this.state = this.initialState;
		this.restaurantNames = [];
	}

	async componentDidMount() {
		const restNames = await this.fetchRestaurantNames();
	}


	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name] : value
		});
	}

	submitForm = async () => {
		const result = await this.props.handleSubmit(this.state);
		console.log(this.state);
		this.setState(this.initialState);
	}

	fetchRestaurantNames = async () => {
		const result = await fetch("/restaurant/names", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
		this.restaurantNames = [...result_1.restaurantNames];
	}

	render() {
		//const { name, street_address, city, state, zip } = this.state;

		const { fieldLabels, fieldNames, fieldTypes, dropdownFields } = this.props;

		let restaurantDropdown = <>  </>;
		let restaurantOptions = [];

		if(dropdownFields.includes("restaurant_id")){

			//this.fetchRestaurantNames();

			restaurantOptions = this.restaurantNames.map ( (restaurant, index) => {
				return (
					<option value={restaurant.id} >
						{restaurant.name}
					</option>

				);
			});

			restaurantDropdown = <select name="restaurant_id" onChange={this.handleChange}>{restaurantOptions}</select>;

		}



		const formFields = fieldLabels.map( (header, index) => {
			return (
				<>
					<label>{header}</label>
					<input
						type = {fieldTypes[index]}
						name = {fieldNames[index]}
						value = {this.state[fieldNames[index]]}
						onChange={this.handleChange}
					/>
				</>
			);

		});

		return (
			<form>
				<fieldset>
					<label>Restaurant</label>
					{restaurantDropdown}
					{formFields}
					<input
		 				type="button"
		 				value="Submit"
		 				onClick={this.submitForm} />
				</fieldset>
			</form>
		);


		// return (
		// 	<form>
		// 		<fieldset>
		// 			<label>Name</label>
		// 			<input
		// 				type="text"
		// 				name="name"
		// 				value={name}
		// 				onChange={this.handleChange} />
		// 			<br/>
		// 			<label>Address</label>
		// 			<input
		// 				type="text"
		// 				name="street_address"
		// 				value={street_address}
		// 				onChange={this.handleChange} />
		// 			<br/>
		// 			<label>City</label>
		// 			<input
		// 				type="text"
		// 				name="city"
		// 				value={city}
		// 				onChange={this.handleChange} />
		// 			<br/>
		// 			<label>State</label>
		// 			<input
		// 				type="text"
		// 				name="state"
		// 				value={state}
		// 				onChange={this.handleChange} />
		// 			<br/>
		// 			<label>Zip</label>
		// 			<input
		// 				type="number"
		// 				name="zip"
		// 				value={zip}
		// 				onChange={this.handleChange} />
		// 			<br/>
		// 			<input
		// 				type="button"
		// 				value="Submit"
		// 				onClick={this.submitForm} />
		// 		</fieldset>
		// 	</form>
		// );
	}
}

export default Form;