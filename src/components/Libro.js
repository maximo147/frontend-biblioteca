import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Libro.css';

export default class Libro extends Component {
    static propTypes = {
        _id: PropTypes.string,
        titulo: PropTypes.string,
        img: PropTypes.string,
        autor: PropTypes.string
    }
    render() {
        const { _id, titulo, img, autor } = this.props
        return (
            <a href={`?id=${_id}`}>
                <div className="card">
                    <div className="card-image">
                        <img src={img} alt="Placeholder image" />
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-6">{titulo}</p>
                                <p className="subtitle is-6">{autor}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}