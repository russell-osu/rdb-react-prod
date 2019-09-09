import React, { Component } from 'react';

class Form extends Component {
	constructor(props) {
		super(props)

		this.initialState = props.entityFields;
		//this.state = this.initialState;
		//this.restaurantNames = [];

		this.state = { 
			fields: this.initialState,
			restaurantNames: [],
			userNames: [],
			menuItemNames: [],
			cuisineNames: []
		};
	}

	async componentDidMount() {
		const restNames = await this.fetchRestaurantNames();
		const usrNames = await this.fetchUserNames();
		const menuItmNames = await this.fetchMenuItemNames();
		const cuisNames = await this.fetchCuisineNames();
		//this.restaurantNames = restNames;
		//this.setState({restaurantNames: this.restaurantNames});
		this.setState({restaurantNames: restNames, userNames: usrNames, menuItemNames: menuItmNames, cuisineNames: cuisNames});
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
		const result = await fetch("/restaurant_review/restaurant/names", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
		//this.restaurantNames = [...result_1.restaurantNames];
		return [...result_1.restaurantNames];
	}

	fetchUserNames = async () => {
		const result = await fetch("/restaurant_review/user", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
		return [...result_1.user];
	}

	fetchMenuItemNames = async () => {
		const result = await fetch("/restaurant_review/menu_item/names", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
		return [...result_1.menu_item];
	}

	fetchCuisineNames = async () => {
		const result = await fetch("/restaurant_review/cuisine", {
		  accept: 'application/json',
		});
		const result_1 = await result.json();
		return [...result_1.cuisine];
	}

	render() {

		const { fieldLabels, fieldNames, fieldTypes, dropdownFields, entity } = this.props;

		const { restaurantNames, userNames, menuItemNames, cuisineNames } = this.state;

		let textarea = <>  </>;
		let restaurantDropdown = <>  </>;
		let restaurantOptions = [];
		let userDropdown = <>  </>;
		let userOptions = [];
		let menuItemDropdown = <>  </>;
		let menuItemOptions = [];
		let cuisineDropdown = <>  </>;
		let cuisineOptions = [];

		if(dropdownFields.includes("restaurant_id")){

			restaurantOptions = restaurantNames.map ( (restaurant, index) => {
				return (
					<option value={restaurant.id} >
						{restaurant.name}
					</option>
				);
			});

			restaurantDropdown = 
						<>
							<label>Restaurant</label>
								<select name="restaurant_id" onChange={this.handleChange}>
									<option value = "0">
										[Select a restaurant]
									</option>
									{restaurantOptions}
								</select>
						</>;
								
		}


		if(dropdownFields.includes("user_id")){

			userOptions = userNames.map ( (user, index) => {
				return (
					<option value={user.id} >
						{user.fname} {user.lname}
					</option>
				);
			});

			userDropdown = <>
							<label>User</label>
								<select name="user_id" onChange={this.handleChange}>
									<option value = "0">
										[Select a user]
									</option>
									{userOptions}
								</select>
							</>;
		}


		if(dropdownFields.includes("menu_item_id")){

			menuItemOptions = menuItemNames.map ( (menuItem, index) => {
				return (
					<option value={menuItem.id} >
						{menuItem.restaurant_name}: {menuItem.menu_item_name}
					</option>
				);
			});

			menuItemDropdown = <>
							<label>Menu Item</label>
								<select name="menu_item_id" onChange={this.handleChange}>
									<option value = "0">
										[Select a menu item]
									</option>
									{menuItemOptions}
								</select>
							</>;
		}

		if(dropdownFields.includes("cuisine_id")){

			cuisineOptions = cuisineNames.map ( (cuisine, index) => {
				return (
					<option value={cuisine.id} >
						{cuisine.name}
					</option>
				);
			});

			cuisineDropdown = <>
							<label>Cuisine</label>
								<select name="cuisine_id" onChange={this.handleChange}>
									<option value = "0">
										[Select a cuisine]
									</option>
									{cuisineOptions}
								</select>
							</>;
		}


		if(entity === "restaurant_review" || entity === "menu_item_review") {
			textarea = 
					<>
						<label>Review</label>
						<textarea name="review" rows="5" cols="80" form="form_post" required onChange={this.handleChange}>
							Enter your review here.
						</textarea>
					</>;
		}

		if(entity === "menu_item") {
			textarea = 
					<>
						<label>Item Description</label>
						<textarea name="description" rows="5" cols="80" form="form_post" required onChange={this.handleChange}>
							Enter the description here.
						</textarea>
					</>;
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
			<form id="form_post">
				<fieldset>
					
					{restaurantDropdown}
					{cuisineDropdown}
					{menuItemDropdown}
					{userDropdown}
					{formFields}
					{textarea}
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