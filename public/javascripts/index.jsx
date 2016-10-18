require('../stylesheets/style.css');
require('../stylesheets/test.css');
// var $ = require('jquery');
import React from 'react';
// import ReactDOM from 'react-dom';

// var React = require('react');
// var ReactDOM = require('react-dom');

let App = React.createClass({
	render() {
		return(
			<h1>Hellsdfsddsafafsdgsdfgsdfgof</h1>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('content'));

console.log(123);
console.log($("p"));
