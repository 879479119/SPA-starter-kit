import React, { Component } from 'react'
import {connect} from 'react-redux'
import run from '../player'
import './main.less'

class Frame extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        run()
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
                    <div className="row margin-top-30px">
                        <div className="col-lg-offset-3 col-lg-6" style={{marginTop:"50px"}}>
                            <pre id="show" className="text-center pre-scrollable">&nbsp;</pre>
                        </div>
                    </div>
                    <audio src="/music.mp3" id="audio">CANNOT PLAY</audio>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-2 text-right">
                                <div className="btn-group">
                                    <button className="btn btn-default btn-xs" ><span className="glyphicon glyphicon-chevron-left">{}</span></button>
                                    <button className="btn btn-default btn-xs" id="start"><span className="glyphicon glyphicon-play">{}</span></button>
                                    <button className="btn btn-default btn-xs"><span className="glyphicon glyphicon-chevron-right">{}</span></button>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="progress" id="drop">
                                    <div className="progress-bar progress-bar-success progress-bar-striped" style={{width:0}} id="pb"></div>
                                    <div id="drag" className=" text-center dragged-div"></div>
                                </div>
                            </div>
                            <div className="col-lg-2 text-left">
                                <span id="time">00:00 / 06:00</span>
                            </div>
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
