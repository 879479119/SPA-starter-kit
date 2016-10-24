import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import './main.less'

class Frame extends Component {
    constructor(props) {
        super(props)
    }
    _click(){
        const {handleChange} = this.props
        handleChange(22222)
    }
    render(){
        const {a} = this.props
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
                    </div>
                </nav>
                <div className="container-fluid main-body">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="list-group">
                                <li className="list-group-item">
                                    <div className="row text-center">
                                        <Link to={"/main"} className="">
                                            <img
                                                src="http://i0.hdslb.com/bfs/face/663cc07db67f40ac79b51f15a1cff5f5cf3b5545.jpg@75Q.webp"
                                                alt="face"/>

                                        </Link>
                                        <h4>Name: <small>RockSAMA</small></h4>
                                        <blockquote>
                                            Tech Otaku Save World
                                        </blockquote>
                                    </div>
                                </li>
                                <Link className="list-group-item active text-center" to={"/main"}>index</Link>
                                <Link className="list-group-item text-center" to={"/main"}>index</Link>
                                <Link className="list-group-item text-center" to={"/main"}>index</Link>
                                <Link className="list-group-item text-center" to={"/main"}>index</Link>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <h1>Building...</h1>
                            {this.props.children}
                            <a href="javascript:;" onClick={this._click.bind(this)} className="asdasd">CLICK</a>
                        </div>
                    </div>
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
