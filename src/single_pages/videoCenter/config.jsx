import React, {Component} from "react";
//noinspection JSUnresolvedVariable
import {hashHistory, IndexRoute, Route, Router} from "react-router";

import Frame from "./containers/frame";
import Main from "./containers/main";

class RouterLoader {
	static loadFun(location, callback){
		require.ensure([], require => {
			console.log(location)
			callback(null, require('./containers/main/fun').default)
		}, 'fun')
	}
	static loadRank(location, callback){
		require.ensure([], require => {
			console.log(location)
			callback(null, require('./containers/main/rank').default)
		}, 'rank')
	}
	static loadAnim(location, callback){
		require.ensure([], require => {
			console.log(location)
			callback(null, require('./containers/main/animation').default)
		}, 'anim')
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
						<IndexRoute component={Main} />
						<Route path={"ranks"} getComponent={RouterLoader.loadRank} />
						<Route path={"fun"} getComponent={RouterLoader.loadFun} />
						<Route path={"animation"} getComponent={RouterLoader.loadAnim} />
					</Route>
				</Route>
			</Router>
		)
	}
}

