import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import './main.less'
import MainSider from './sub-lists/main'

class Frame extends Component {
    constructor(props) {
        super(props)
    }
    _click(){
        const {handleChange} = this.props
        handleChange(22222)
    }
    render(){
        const {a, children} = this.props
        return (
            <div className="container-fluid frame">
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed">
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to={"/main"}>main</Link></li>
                            <li><Link to={"/live"}>live</Link></li>
                            <li ><Link to={"/field"}>field</Link></li>
                            <li ><Link to={"/watch"}>watch</Link></li>
                            <li ><Link to={"/personal"}>personal</Link></li>
                        </ul>

                        <form action="#" className="navbar-form navbar-right">
                            <div className="form-group">
                                <input type="text" name="search" id="search" className="form-control" placeholder="Search whole site"/>
                            </div>
                            <button type="submit" className="btn btn-default btn-search"><span className="glyphicon glyphicon-search">
                            </span></button>
                        </form>
                    </div>
                </nav>
                <div className="container-fluid main-body">
                    <div className="row">
                        <div className="col-lg-3">
                            {<MainSider/>}
                        </div>
                        <div className="col-lg-9 content-body">
                            {/*this is where we render its childElements*/}
                            {children}
                        </div>
                    </div>
                    <footer className="footer">
                        <p>copyright@RockSAMA- <ins> 767444690@qq.com</ins></p>
                    </footer>
                </div>
            </div>
        )
    }
}

const maps2p = (state) => ({
    a: state.common.a
})

export default connect(maps2p,{
    handleChange
})(Frame)
