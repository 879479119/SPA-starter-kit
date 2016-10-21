import React from 'react'

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>FIELD</p>
                {this.props.children}
            </div>
        )
    }
}
