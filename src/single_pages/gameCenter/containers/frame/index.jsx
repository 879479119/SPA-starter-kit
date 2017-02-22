import React, { Component } from 'react'
import {connect} from 'react-redux'
import { init, editMap, enter } from '../game'

import './main.less'

class Frame extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        let game = {status: "profile"}
        setInterval(()=>{
            if(game.status === "profile"){
	            enter(game)
                game.status = ""
            }else if(game.status === "running"){
	            init(game)
                game.status = ""
            }else if(game.status === "edit"){
	            editMap(game)
                game.status = ""
            }
        },200)
    }
    render(){
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
                        <div className="well well-body" style={{position: "relative"}} id="canvas-container">
                            <canvas id="canvas" width={"800"} height={"400"}>Your browser does not support canvas</canvas>
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
    a: state.common.a,
})

export default connect(maps2p,{
})(Frame)
