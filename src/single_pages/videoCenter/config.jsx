import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';

import Frame from './containers/frame'
import Main from './containers/main'

// import MainHome from './containers/main/home'
import Rank from './containers/main/rank'
import Fun from './containers/main/fun'
import Animation from './containers/main/animation'

//关于react-router路由的配置
export default class RouterConfig extends Component {
	render(){
		return (
			<Router>
				<Route path="/" component={Frame}>
					<IndexRoute component={Main}/>
					<Route path="/main">
						<IndexRoute components={Main} />
						<Route path={"ranks"} components={Rank} />
						<Route path={"fun"} components={Fun} />
						<Route path={"animation"} components={Animation} />
					</Route>
					{/*<Route path="/live" components={Show}/>*/}
					{/*<Route path="/field" components={Show}/>*/}
					{/*<Route path="/watch" components={Show}/>*/}
					{/*<Route path="/personal" components={Show}/>*/}
				</Route>
			</Router>
		)
	}
}

