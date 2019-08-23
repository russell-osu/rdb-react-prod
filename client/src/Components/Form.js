import React, { Component } from 'react';

class Form extends Component {
	constructor(props) {
		super(props)

		this.initialState = props.entityFields;
		//this.state = this.initialState;
		//this.restaurantNames = [];

		this.state = { 
			fields: this.initialState,
			restaurantNames: []
		};
	}

	async componentDidMount() {
		const restNames = await this.fetchRestaurantNames();
		//this.restaurantNames = restNames;
		//this.setState({restaurantNames: this.restaurantNames});
		this.setState({restaurantNames: restNames});
	}


	handleChange = event => {
		const {name, value} = event.target;
		// this.setState({
		// 	[name] : value 
		// });

		this.setState( prevState => ({
			fields: {
				...prevState.fields,
				[name] : value
			}
		}));
		
	}

	submitForm = async () => {
		const result = await this.props.handleSubmit(this.state.fields);
		// const restNames = await this.fetchRestaurantNames();
		// this.restaurantNames = restNames;
		this.setState( prevState => ({
			fields: this.initialState
		}));
	}

	fetchRestaurantNames = async () => {
		const result = await fetch("/restaurant/names", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
		//this.restaurantNames = [...result_1.restaurantNames];
		return [...result_1.restaurantNames];
	}

	render() {
		//const { name, street_address, city, state, zip } = this.state;

		const { fieldLabels, fieldNames, fieldTypes, dropdownFields } = this.props;

		const { restaurantNames } = this.state;

		let restaurantDropdown = <>  </>;
		let restaurantOptions = [];

		if(dropdownFields.includes("restaurant_id")){

			restaurantOptions = restaurantNames.map ( (restaurant, index) => {
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
						value = {this.state.fields[fieldNames[index]]}
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

	}
}

export default Form;