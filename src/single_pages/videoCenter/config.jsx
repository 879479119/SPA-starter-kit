import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';

import Frame from './containers/frame'
import Main from './containers/main'

// import MainHome from './containers/main/home'
import Rank from './containers/main/rank'
// import Fun from './containers/main/fun'
import Animation from './containers/main/animation'

class RouterLoader {
	static loadMain(location, callback){
		require.ensure([], require => {
			callback(null, require('./containers/main').default)
			console.log("inner");
		}, 'main')
	}
	static loadFun(location, callback){
		require.ensure([], require => {
			console.log(location)
			callback(null, require('./containers/main/fun').default)
		}, 'fun')
	}
}

//关于react-router路由的配置
export default class RouterConfig extends Component {
	render(){
		return (
			<Router>
				<Route path="/" component={Frame}>
					<IndexRoute component={Main}/>
					<Route path="/main">
						<IndexRoute getComponent={RouterLoader.loadMain} />
						<Route path={"ranks"} component={Rank} />
						<Route path={"fun"} getComponent={RouterLoader.loadFun} />
						<Route path={"animation"} components={Animation} />
					</Route>
				</Route>
			</Router>
		)
	}
}

