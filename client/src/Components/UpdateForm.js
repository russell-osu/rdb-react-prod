import React, { Component } from 'react';


class UpdateForm extends Component {
	constructor(props) {
		super(props)


		this.state = { 
			fields: props.entityFields,
			restaurantNames: [],
			userNames: [],
			menuItemNames: [],
            cuisineNames: []
		};
		
		this.restaurantNames = props.restaurantNames;
		this.userNames = props.userNames;
		this.menuItemNames = props.menuItemNames;
		this.cuisineNames = props.cuisineNames;

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
        //add current records id to submitted form
        var tempFields = {};
        tempFields = this.state.fields;
        tempFields.id = this.props.currRecord.id;
        const result = await this.props.handleSubmit(tempFields);
        
	}



	render() {

		const { fieldLabels, fieldNames, fieldTypes, dropdownFields, entity, currRecord } = this.props;
		const { restaurantNames, userNames, menuItemNames, cuisineNames, formFields } = this;
	

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
                <h3>Update Record</h3>
                <form id="form_post">
                    <fieldset>
                        
						<RestaurantDropdown
							dropdownFields = {dropdownFields}
							restaurantNames = {restaurantNames}
							currRecord = {currRecord}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>
						<UserDropdown
							dropdownFields = {dropdownFields}
							userNames = {userNames}
							currRecord = {currRecord}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>
						<MenuItemDropdown
							dropdownFields = {dropdownFields}
							menuItemNames = {menuItemNames}
							currRecord = {currRecord}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>
						<CuisineDropdown
							dropdownFields = {dropdownFields}
							cuisineNames = {cuisineNames}
							currRecord = {currRecord}
							formFields = {this.state.fields}
							handleChange = {this.handleChange}
						/>						

						{fields}
						
						<TextArea
							entity = {entity}
							currRecord = {currRecord}
							handleChange = {this.handleChange}
						/>
                        <input
                            type="button"
                            value="Update"
                            onClick={this.submitForm} />
                    </fieldset>
                </form>
            </div>
		);

	}
}




const RestaurantDropdown =  (props) => {

	let { dropdownFields, currRecord, formFields, handleChange, restaurantNames } = props;


	if(!(dropdownFields.includes("restaurant_id"))){
		return <> </>;
	}


	var restaurantOptions = restaurantNames.map ( (restaurant, index) => {
		//find id matching curr records restaurant name for pre-populating dropdown
		if(currRecord["restaurant_name"] === restaurant.name && formFields.restaurant_id === '')
				formFields.restaurant_id = restaurant.id;

		return (
			<option key={restaurant.id} value={restaurant.id} >
				{restaurant.name}
			</option>
		);
	});

	return (
			<>
				<label>Restaurant</label>
					<select value={formFields.restaurant_id} name="restaurant_id" onChange={handleChange}>
						{restaurantOptions}
					</select>
			</>
	);	
	
}


const UserDropdown =  (props) => {

	let { dropdownFields, currRecord, formFields, handleChange, userNames } = props;


	if(!(dropdownFields.includes("user_id"))){
		return <> </>;
	}


	var userOptions = userNames.map ( (user, index) => {
		//find id matching curr records user name for pre-populating dropdown
		if(currRecord["fname"] === user.fname && currRecord["lname"] === user.lname && formFields.user_id === '')
				formFields.user_id = user.id;

		return (
			<option key={user.id} value={user.id} >
				{user.fname} {user.lname}
			</option>
		);
	});

	return (
			<>
				<label>User</label>
					<select value={formFields.user_id} name="user_id" onChange={handleChange}>
						{userOptions}
					</select>
			</>
	);	

		
}



const MenuItemDropdown =  (props) => {

	let { dropdownFields, currRecord, formFields, handleChange, menuItemNames } = props;


	if(!(dropdownFields.includes("menu_item_id"))){
		return <> </>;
	}


	var menuItemOptions = menuItemNames.map ( (menuItem, index) => {
		//find id matching curr records menuItem name for pre-populating dropdown
		if(currRecord["menu_item_name"] === menuItem.menu_item_name && formFields.menu_item_id === '')
				formFields.menu_item_id = menuItem.id;

		return (
			<option key={menuItem.id} value={menuItem.id} >
				{menuItem.restaurant_name}: {menuItem.menu_item_name}
			</option>
		);
	});

	return (
			<>
				<label>Menu Item</label>
					<select value={formFields.menu_item_id} name="menu_item_id" onChange={handleChange}>
						{menuItemOptions}
					</select>
			</>
	);	
	
}



const CuisineDropdown =  (props) => {

	let { dropdownFields, currRecord, formFields, handleChange, cuisineNames } = props;


	if(!(dropdownFields.includes("cuisine_id"))){
		return <> </>;
	}


	var cuisineOptions = cuisineNames.map ( (cuisine, index) => {
		//find id matching curr records cuisine name for pre-populating dropdown
		if(currRecord["cuisine_name"] === cuisine.name && formFields.cuisine_id === '')
				formFields.cuisine_id = cuisine.id;

		return (
			<option key={cuisine.id} value={cuisine.id} >
				{cuisine.cuisine_name}
			</option>
		);
	});

	return (
			<>
				<label>Cuisine</label>
					<select value={formFields.cuisine_id} name="cuisine_id" onChange={handleChange}>
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
					<textarea name="review" rows="5" cols="80" form="form_post" required onChange={handleChange}>
					{currRecord.review}
					</textarea>
				</>
		);
	}

	else if(entity === "menu_item") {
		return (
				<>
					<label>Item Description</label>
					<textarea name="description" rows="5" cols="80" form="form_post" required onChange={handleChange}>
					{currRecord.description}
					</textarea>
				</>
		);
	}

	else
		return <> </>;

}



export default UpdateForm;


