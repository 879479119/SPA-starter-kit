// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

// 引入React-Router模块
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import configureStore from './store'
import Show from './components/show'

// 配置整体组件
class Init extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>2324342432432342</p>
                {this.props.children}
            </div>
        )
    }
}

//关于react-router路由的配置
class RouterConfig extends Component {
  render(){return (
    <Router>
      <Route path="/" component={Show}/>
    </Router>
  )}
}



//关于redux中store的配置
let store = configureStore();

class Main extends Component {
	render(){
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
