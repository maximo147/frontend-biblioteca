import React, { Component } from 'react'
import img404 from '../assets/notFound.png'

export default class NotFound extends Component {
    render(){
        return (
            <div>
                <img src={img404} />
            </div>
        )
    }
}