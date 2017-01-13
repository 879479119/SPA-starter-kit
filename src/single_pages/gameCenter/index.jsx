import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// 引入框架页面（包括嵌套的子页面）
import Frame from './containers/frame';
import configureStore from './store'

//关于redux中store的配置
let store = configureStore();

// 引入主体样式
import './main.less';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <Provider store={store}>
                <Frame/>
            </Provider>
        )
    }
}

// 配置路由，并将路由注入到id为init的DOM元素中
ReactDOM.render((
    <Main/>
), document.querySelector('#content'))
