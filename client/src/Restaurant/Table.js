import React, {Component} from 'react';

class Table extends Component {
	render() {

		const { restaurantData, removeRestaurant } = this.props;

		return (
            <table>
            	<TableHeader />
            	<TableBody 
            		restaurantData = {restaurantData} 
            		removeRestaurant = {removeRestaurant}
            	/>
            </table>
        );
	}
}

const TableHeader = () => {
	return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Street Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
	const rows = props.restaurantData.map((obj, index) => {
		return (
			<tr key={index}>
				<td>{obj.name}</td>
				<td>{obj.street_address}</td>
				<td>{obj.city}</td>
				<td>{obj.state}</td>
				<td>{obj.zip}</td>
				<td><button onClick={() => props.removeRestaurant(obj.id, index)}>Delete</button></td>
			</tr>

		);
	});

	return <tbody>{rows}</tbody>;
	
}

export default Table;