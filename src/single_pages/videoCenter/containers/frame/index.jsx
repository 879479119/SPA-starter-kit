import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';


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
            <div className="container-fluid">
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
                <aside className="aside">

                </aside>
                <div className="container">
                    {this.props.children}
                </div>

                <a href="javascript:;" onClick={this._click.bind(this)} className="asdasd">CLICK</a>
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
