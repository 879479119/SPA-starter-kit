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
                    <div className="row">
                        <article className="flex-box box-b">
                            <h3>弹幕演示视频:</h3>
                            <div id="player" className="player">
                                <video src="/stream/video.mp4" className="video" id="video" controls>CANNOT LOAD</video>
                                <div id="show-layout">
                                </div>
                            </div>
                            <form action="#" id="comment-form">
                                <input type="text" id="comment" className="input-trans comment-bar"/>
                                <input type="button" value="发射弹幕" id="submit" className="input-trans"/>
                            </form>
                        </article>
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
