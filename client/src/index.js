import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Restaurant from './Restaurant/Restaurant';


const routing = (
	<Router>
		<div>
		<ul>
			<li>
				<Link to="/restaurant">Restaurant</Link>
			</li>
		</ul>
			<Route path="/restaurant" component={Restaurant} />
		</div>
	</Router>
)


//ReactDOM.render(<Restaurant />, document.getElementById('root'));

ReactDOM.render(routing, document.getElementById('root'));

