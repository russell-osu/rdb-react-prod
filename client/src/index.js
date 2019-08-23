import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import CrudTemplate from './Components/CrudTemplate';


const routing = (
	<Router>
		<div>
		{/* <ul>
			<li>
				<Link to="/restaurant">Restaurant</Link>
			</li>
		</ul> */}
			<Route 
				path="/restaurant" 
				//component={Restaurant}
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/restaurant"} 
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
				path="/user"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/user"} 
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
				path="/visit"
				//https://tylermcginnis.com/react-router-pass-props-to-components/
				render ={(props) => 
					<CrudTemplate {...props} 
							endpoint = {"/visit"} 
							entity = {"visit"}
							tableHeaders = {["Restaurant", "Date", "Price", "Meal Type"]}
							fieldLabels = {["Date", "Price", "Meal Type"]}
							entityFields = {{ restaurant_id: '', visit_date: '', price: '', meal_type: ''}}
							fieldNames = {["visit_date", "price", "meal_type"]}
							fieldTypes = {["date", "number", "text"]}
							dropdownFields = {["restaurant_id"]}
															/>} 				
			/>



		</div>
	</Router>
)


//ReactDOM.render(<Restaurant />, document.getElementById('root'));

ReactDOM.render(routing, document.getElementById('root'));

