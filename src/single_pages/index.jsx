import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';

// 引入单个页面（包括嵌套的子页面）
// import VideoCenter from './videoCenter';

// 引入主体样式
import './main.less';

// 配置整体组件
class Init extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <p>2324342432432342</p>
            </div>
        )
    }
}

class Page extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <p>PAGE</p>
            </div>
        )
    }
}

// // 配置路由，并将路由注入到id为init的DOM元素中
// RouterConfig.render((
//     <Router history={hashHistory} >
//         <Route path="/" component={Init}>
//             <IndexRoute component={Page}/>
//         </Route>
//     </Router>
// ), document.querySelector('#content'))
