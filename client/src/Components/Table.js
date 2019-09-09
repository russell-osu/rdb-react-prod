import React, {Component} from 'react';

class Table extends Component {

	render() {

		const { records, deleteRecord, tableHeaders } = this.props;
		
		return (
            <table>
            	<TableHeader 
					tableHeaders = {tableHeaders}
				/>
            	<TableBody 
            		records = {records} 
            		deleteRecord = {deleteRecord}
            	/>
            </table>
        );
	}
}

const TableHeader = props => {
	const headers = props.tableHeaders.map( (header, index) => {

		return (
				<th>{header}</th>
		);
	});
	
	return <thead><tr>{headers}</tr></thead>
}

const TableBody = props => {
	const rows = props.records.map((obj, index) => {


		const tdata = Object.keys(obj).map( key => {
			if(key !== "id" && !key.includes("_id")){//ensure id property is not displayed
				return (
				<td>{obj[key]}</td>
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
			</tr>

		);
	});

	return <tbody>{rows}</tbody>;
	
}

export default Table;