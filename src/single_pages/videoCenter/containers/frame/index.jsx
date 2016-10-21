import React from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'

class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>FRAMEWORK</p>
                {this.props.children}
            </div>
        )
    }
}

const maps2p = (state) => ({
  a: state.common.a
})

export default connect(mas2p,{
  handleChange
})(Page)
