import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// 引入React-Router模块
// import React, { Component } from 'react'
import { Provider } from 'react-redux'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import configureStore from './store'
import RouterConfig from './config'

//关于redux中store的配置
let store = configureStore();

class Main extends Component {
	render (){
		return (
			<Provider store={store}>
				<RouterConfig/>
			</Provider>
		)
	}
}

// 配置路由，并将路由注入到id为init的DOM元素中
ReactDOM.render((
    <Main/>
), document.querySelector('#content'))
