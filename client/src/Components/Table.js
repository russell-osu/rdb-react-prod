import React, {Component} from 'react';

class Table extends Component {

	render() {

		const { records, deleteRecord, updateRecord, tableHeaders, restaurantNames } = this.props;
		
		return (
            <table>
            	<TableHeader 
					tableHeaders = {tableHeaders}
				/>
            	<TableBody 
            		records = {records} 
					deleteRecord = {deleteRecord}
					updateRecord = {updateRecord}
					restaurantNames = {restaurantNames}
            	/>
            </table>
        );
	}
}

const TableHeader = props => {
	const headers = props.tableHeaders.map( (header, index) => {

		return (
				<th key={header}>{header}</th>
		);
	});
	
	return <thead><tr>{headers}</tr></thead>
}

const TableBody = props => {
	const rows = props.records.map((obj, index) => {

		const tdata = Object.keys(obj).map( key => {

			// if(key === "restaurant_id"){
			// 	var td = <td></td>;
			// 	props.restaurantNames.forEach( element => {
			// 		if(obj[key] === element["id"].toString()){	
			// 			td = <td key={obj[key]}>{element["name"]}</td>
			// 		}
			// 	});
			// 	return td;
			// }

			if(key !== "id" && !key.includes("_id") && !key.includes("visit")){//ensure id property and visit date are not displayed
				return (
				<td key={obj[key]}>{obj[key]}</td>
				);
			}
		});

		/*Shorthand for the above. Using parentheses instead of braces in an arrow function automatically
		returns the evaluated expression*/
		// const tdata = Object.keys(obj).map( key => 
		// 	<td>{obj[key]}</td>
		// );

		return (
			<tr key={obj.id}>
				{tdata}
				<td><button onClick={() => props.deleteRecord(obj.id, index)}>Delete</button></td>
				<td><button onClick={() => props.updateRecord(obj, index)}>Update</button></td>
			</tr>

		);
	});

	return <tbody>{rows}</tbody>;
	
}

export default Table;