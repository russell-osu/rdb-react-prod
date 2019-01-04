import React, { Component } from 'react';

class RestForm extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			name: '',
			street_address: '',
			city: '',
			state: '',
			zip: ''
		};


		this.state = this.initialState;
	}


	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name] : value
		});
	}

	submitForm = () => {
		this.props.handleSubmit(this.state);
		console.log(this.state);
		this.setState(this.initialState);
	}

	render() {
		const { name, street_address, city, state, zip } = this.state;

		return (
			<form>
				<fieldset>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={this.handleChange} />
					<br/>
					<label>Address</label>
					<input
						type="text"
						name="street_address"
						value={street_address}
						onChange={this.handleChange} />
					<br/>
					<label>City</label>
					<input
						type="text"
						name="city"
						value={city}
						onChange={this.handleChange} />
					<br/>
					<label>State</label>
					<input
						type="text"
						name="state"
						value={state}
						onChange={this.handleChange} />
					<br/>
					<label>Zip</label>
					<input
						type="number"
						name="zip"
						value={zip}
						onChange={this.handleChange} />
					<br/>
					<input
						type="button"
						value="Submit"
						onClick={this.submitForm} />
				</fieldset>
			</form>
		);
	}
}

export default RestForm;