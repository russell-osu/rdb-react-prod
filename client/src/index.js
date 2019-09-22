import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import CrudTemplate from './Components/CrudTemplate';


const routing = (
	<Router  basename="/restaurant_review"  >
		<div>
		{/* <ul>
			<li>
				<Link to="/restaurant">Restaurant</Link>
			</li>
		</ul> */}
			<Route 
				path="/restaurant_pg" 
				//component={Restaurant}
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/restaurant"} 
							entity = {"restaurant"}
							tableHeaders = {["Name", "Street Address", "City", "State", "Zip"]}
							fieldLabels = {["Name", "Street Address", "City", "State", "Zip"]}
							entityFields = {{ name: '', street_address: '', city: '', state: '', zip: ''}}
							fieldNames = {["name", "street_address", "city", "state", "zip"]}
							fieldTypes = {["text", "text", "text", "text", "number"]}
							dropdownFields = {[]}
															/>} 
			/>

			<Route 
				path="/user_pg"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/user"} 
							entity = {"user"}
							tableHeaders = {["First Name", "Last Name"]}
							fieldLabels = {["First Name", "Last Name"]}
							entityFields = {{ fname: '', lname: ''}}
							fieldNames = {["fname", "lname"]}
							fieldTypes = {["text", "text"]}
							dropdownFields = {[]}
															/>} 			
			/>

			<Route 
				path="/visit_pg"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/visit"} 
							entity = {"visit"}
							tableHeaders = {["Restaurant", "Date", "Price", "Meal Type"]}
							fieldLabels = {["Date (yyyy-mm-dd)", "Price", "Meal Type"]}
							entityFields = {{ restaurant_id: '', visit_date: '', price: '', meal_type: ''}}
							fieldNames = {["visit_date", "price", "meal_type"]}
							fieldTypes = {["date", "number", "text"]}
							dropdownFields = {["restaurant_id"]}
															/>} 				
			/>

			<Route 
				path="/restaurant_review_pg"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/restaurant_review"} 
							entity = {"restaurant_review"}
							tableHeaders = {["Restaurant", "User First", "User Last", "Review"]}
							fieldLabels = {[]}
							entityFields = {{ restaurant_id: '', user_id: '', review: ''}}
							fieldNames = {[]}
							fieldTypes = {[]}
							dropdownFields = {["restaurant_id", "user_id"]}
															/>} 				
			/>

			<Route 
				path="/menu_item_pg"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/menu_item"} 
							entity = {"menu_item"}
							tableHeaders = {["Restaurant", "Menu Item", "Price", "Description"]}
							fieldLabels = {["Menu Item", "Price"]}
							entityFields = {{ restaurant_id: '', menu_item_name: '', price: '', description: ''}}
							fieldNames = {["menu_item_name", "price"]}
							fieldTypes = {["text", "number"]}
							dropdownFields = {["restaurant_id"]}
															/>} 				
			/>

			<Route 
				path="/menu_item_review_pg"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/menu_item_review"} 
							entity = {"menu_item_review"}
							tableHeaders = {["Menu Item", "Restaurant", "User First", "User Last", "Review"]}
							fieldLabels = {[]}
							entityFields = {{ menu_item_id: '', restaurant_id: '', user_id: '', review: ''}}
							fieldNames = {[]}
							fieldTypes = {[]}
							dropdownFields = {["menu_item_id", "user_id"]}
															/>} 				
			/>


			<Route 
				path="/cuisine_pg"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/cuisine"} 
							entity = {"cuisine"}
							tableHeaders = {["Cuisine"]}
							fieldLabels = {["Cuisine Name"]}
							entityFields = {{ cuisine_name: ''}}
							fieldNames = {["cuisine_name"]}
							fieldTypes = {["text"]}
							dropdownFields = {[]}
															/>} 				
			/>

			<Route 
				path="/restaurant_cuisine_pg"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant_review/restaurant_cuisine"} 
							entity = {"restaurant_cuisine"}
							tableHeaders = {["Restaurant", "Cuisine"]}
							fieldLabels = {[]}
							entityFields = {{restaurant_id: '', cuisine_id: ''}}
							fieldNames = {["cuisine_name"]}
							fieldTypes = {["text"]}
							dropdownFields = {["restaurant_id", "cuisine_id"]}
															/>} 				
			/>


		</div>
	</Router>
)


//ReactDOM.render(<Restaurant />, document.getElementById('root'));

ReactDOM.render(routing, document.getElementById('root'));

