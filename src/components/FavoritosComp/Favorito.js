import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie'
import './Favorito.css'
const cookies = new Cookies();



class BotonSinAquirir extends Component {
    _handleCompra = () => {
        cookies.set('libroActual', this.props.id, { path: '/' })
        window.location.href = `/venta-libro?id=${this.props.id}`
    }
    _handleAlquiler = () => {
        cookies.set('libroActual', this.props.id, { path: '/' })
        window.location.href = `/alquiler-libro?id=${this.props.id}`
    }

    render() {
        return (
            <div class="buttons">
                <button className="boton" onClick={this._handleAlquiler}>Alquilar</button>
                <button className="boton" onClick={this._handleCompra}>comprar</button>
            </div>
        )
    }
}

class BotonAdquirido extends Component {
    render() {
        return (
            <div className="buttons">
                <button className="boton">Leer</button>
            </div>
        )
    }
}

export default class Favorito extends Component {
    state = {
        flag: false
    }
    static propTypes = {
        _id: PropTypes.string,
        titulo: PropTypes.string,
        img: PropTypes.string,
        autor: PropTypes.string,
        descripcion: PropTypes.string
    }


    componentDidMount() {
        const misLibros = cookies.get('mislibros')
        const { _id } = this.props
        misLibros.map(libro => {
            if (libro.libro._id === _id) {

                this.setState({ flag: true })
            }
        })
    }


    render() {
        const { _id, titulo, img, autor, anioPublicaion, descripcion } = this.props

        return (
            <div className="container-favorito">
                <div className="favorito-main">
                    <div className="container-imagen">
                        <img src={img} alt="..." />
                    </div>
                    <div className="container-body">
                        <h5 className="subtitulo">{titulo}</h5>
                        <p className="subtitulo">{autor}</p>
                        <p className="subtitulo">{anioPublicaion}</p>
                        <p className="subtitulo-descripcion">{descripcion}</p>
                    </div>
                </div>
                <div className="container-footer">
                    {
                        (this.state.flag) ? <BotonAdquirido /> : <BotonSinAquirir id={_id} />
                    }
                </div>

            </div>
        )
    }
}