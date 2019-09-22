import React, { Component } from 'react';

class Form extends Component {
	constructor(props) {
		super(props)

		this.initialState = props.entityFields;

		this.state = { 
			fields: this.initialState,
			restaurantNames: props.restaurantNames,
			userNames: [],
			menuItemNames: [],
			cuisineNames: []
		};

	}


	handleChange = event => {
		const {name, value} = event.target;

		this.setState( prevState => ({
			fields: {
				...prevState.fields,
				[name] : value
			}
		}));
		
	}

	submitForm = async () => {
		const result = await this.props.handleSubmit(this.state.fields);

		//clear all form fields
		this.setState( prevState => ({
			fields: this.initialState
		}));


		const { entity, dropdownFields } = this.props;

		if(entity === "restaurant_review" || entity === "menu_item_review" || entity === "menu_item")
			document.getElementById("textfield").value = '';

		if(dropdownFields.includes("restaurant_id"))
			document.getElementById("restaurantDropdown").value = 0;

		if(dropdownFields.includes("user_id"))	
			document.getElementById("userDropdown").value = 0;

		if(dropdownFields.includes("menu_item_id"))
			document.getElementById("menuItemDropdown").value = 0;

		if(dropdownFields.includes("cuisine_id"))	
			document.getElementById("cuisineDropdown").value = 0;
	}



	render() {

		const { fieldLabels, fieldNames, fieldTypes, dropdownFields, entity, restaurantNames, userNames, menuItemNames, cuisineNames } = this.props;

		const fields = fieldLabels.map( (header, index) => {
			return (
				<div key={header}>
					<label>{header}</label>
					<input
						type = {fieldTypes[index]}
						name = {fieldNames[index]}
						value = {this.state.fields[fieldNames[index]]}
						onChange={this.handleChange}
					/>
				</div>
			);

		});

		return (
            <div>   
                <h3>Entity: {entity}</h3>
                <form id="form_post">
                    <fieldset>
                        
						<RestaurantDropdown
							dropdownFields = {dropdownFields}
							restaurantNames = {restaurantNames}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>
						<UserDropdown
							dropdownFields = {dropdownFields}
							userNames = {userNames}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>
						<MenuItemDropdown
							dropdownFields = {dropdownFields}
							menuItemNames = {menuItemNames}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>
						<CuisineDropdown
							dropdownFields = {dropdownFields}
							cuisineNames = {cuisineNames}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>						

						{fields}
						
						<TextArea
							entity = {entity}
							handleChange = {this.handleChange}
						/>
                        <input
                            type="button"
                            value="Submit"
                            onClick={this.submitForm} />
                    </fieldset>
                </form>
            </div>
		);

	}
}




const RestaurantDropdown =  (props) => {

	let { dropdownFields, handleChange, restaurantNames } = props;


	if(!(dropdownFields.includes("restaurant_id"))){
		return <> </>;
	}


	var restaurantOptions = restaurantNames.map ( (restaurant, index) => {

		return (
			<option key={restaurant.id} value={restaurant.id} >
				{restaurant.name}
			</option>
		);
	});

	return (
			<>
				<label>Restaurant</label>
					<select name="restaurant_id" id="restaurantDropdown" onChange={handleChange}>
						<option value = "0">
 							[Select a restaurant]
 						</option>
						{restaurantOptions}
					</select>
			</>
	);	
	
}


const UserDropdown =  (props) => {

	let { dropdownFields, handleChange, userNames } = props;


	if(!(dropdownFields.includes("user_id"))){
		return <> </>;
	}


	var userOptions = userNames.map ( (user, index) => {

		return (
			<option key={user.id} value={user.id} >
				{user.fname} {user.lname}
			</option>
		);
	});

	return (
			<>
				<label>User</label>
					<select name="user_id" id="userDropdown" onChange={handleChange}>
						<option value = "0">
 							[Select a user]
 						</option>
						{userOptions}
					</select>
			</>
	);	

		
}



const MenuItemDropdown =  (props) => {

	let { dropdownFields, handleChange, menuItemNames } = props;

	if(!(dropdownFields.includes("menu_item_id"))){
		return <> </>;
	}

	var menuItemOptions = menuItemNames.map ( (menuItem, index) => {

		return (
			<option key={menuItem.id} value={menuItem.id} >
				{menuItem.restaurant_name}: {menuItem.menu_item_name}
			</option>
		);
	});

	return (
			<>
				<label>Menu Item</label>
					<select name="menu_item_id" id="menuItemDropdown" onChange={handleChange}>
						<option value = "0">
 							[Select a menu item]
 						</option>						
						{menuItemOptions}
					</select>
			</>
	);	
	
}



const CuisineDropdown =  (props) => {

	let { dropdownFields,handleChange, cuisineNames } = props;


	if(!(dropdownFields.includes("cuisine_id"))){
		return <> </>;
	}


	var cuisineOptions = cuisineNames.map ( (cuisine, index) => {

		return (
			<option key={cuisine.id} value={cuisine.id} >
				{cuisine.cuisine_name}
			</option>
		);
	});

	return (
			<>
				<label>Cuisine</label>
					<select name="cuisine_id" id="cuisineDropdown" onChange={handleChange}>
						<option value = "0">
 							[Select a cuisine]
 						</option>
						{cuisineOptions}
					</select>
			</>
	);	
	
}



const TextArea = props => {

	let { entity, currRecord, handleChange,  } = props;

	if(entity === "restaurant_review" || entity === "menu_item_review") {
		return (
				<>
					<label>Review</label>
					<textarea name="review" id="textfield" rows="5" cols="80" form="form_post" required onChange={handleChange}>
					</textarea>
				</>
		);
	}

	else if(entity === "menu_item") {
		return (
				<>
					<label>Item Description</label>
					<textarea name="description" id="textfield" rows="5" cols="80" form="form_post" required onChange={handleChange}>
					</textarea>
				</>
		);
	}

	else
		return <> </>;

}




export default Form;