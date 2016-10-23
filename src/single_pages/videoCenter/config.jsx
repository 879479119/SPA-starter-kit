import React, {Component} from 'react';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';

import Frame from './containers/frame'
import Main from './containers/main'

//关于react-router路由的配置
export default class RouterConfig extends Component {
	render(){
		return (
			<Router>
				<Route path="/" component={Frame}>
					<Route path="/main" components={Main}/>
					{/*<Route path="/live" components={Show}/>*/}
					{/*<Route path="/field" components={Show}/>*/}
					{/*<Route path="/watch" components={Show}/>*/}
					{/*<Route path="/personal" components={Show}/>*/}
				</Route>
			</Router>
		)
	}
}

