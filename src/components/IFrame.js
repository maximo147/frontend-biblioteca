import React, { Component } from 'react'
import Cookies from 'universal-cookie'
const cookies = new Cookies();


class IFrame extends Component {
    componentDidMount() {

       
    }

    render() {
        return (
            <div>
                <iframe
                    src={``}
                    width={800}
                    height={550}>

                </iframe>
            </div>
        )
    }
}


export default IFrame