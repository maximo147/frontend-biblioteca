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
                <div className="tarjeta">
                    <div className="tarjeta-image">
                        <img src={img} />
                    </div>
                    <div className="contenido-info">
                        <h4 className="titulo-libro">{titulo}</h4>
                        <h6 className="subtitulo-autor">{autor}</h6>
                    </div>
                </div>
            </a>
        )
    }
}