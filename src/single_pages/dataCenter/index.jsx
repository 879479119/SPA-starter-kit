// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';

// 引入单个页面（包括嵌套的子页面）
// import VideoCenter from './videoCenter';

// 引入主体样式
import './main.less';

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
                <Link to="/a">asdasd</Link>
            </div>
        )
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>PAG</p>
                {this.props.children}
                <Link to="/">asdasd</Link>
            </div>
        )
    }
}

// 配置路由，并将路由注入到id为init的DOM元素中
ReactDOM.render((
    <Router>
        <Route path="/" component={Init}>
            <Route path="a" component={Page} />
        </Route>
    </Router>
), document.querySelector('#content'))
