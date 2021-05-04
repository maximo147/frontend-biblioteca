import { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from '../components/Menu'
import '../css/DetalleLibro.css'

import Cookies from 'universal-cookie'
const cookies = new Cookies();


export default class DetalleLibro extends Component {
    static propTypes = {
        id: PropTypes.string
    }
    state = {
        libros: ''
    }

    _fetchLibro = ({ id }) => {
        fetch(`http://localhost:8080/api/libros/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ libros: data })
            });
    }
    _handleHeart = (e) => {
        // alert('Hola')

    }
    _volverAtras = (e) => {
        window.history.back()
    }
    _handleOpenLibro = (e) => {
        if (!cookies.get('nombreUsuario')) {
            window.location.href = '/login'
        } else {
            window.location.href = "/pdf/visualizar"
        }
    }

    componentDidMount() {
        const { id } = this.props
        this._fetchLibro({ id })

        // Simple POST request with a JSON body using fetch
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' }
        // };
        // fetch('http://localhost:8080/api/busqueda/:id', requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
    }

    render() {
        return (
            <div>
                < Menu />
                <div className="detalle-libro">
                    <div className="contenedor">
                        <hr />
                        <div className="header-detalle">
                            <div className="atras">
                                <button className="button is-link" onClick={this._volverAtras}>Atras</button>
                            </div>
                            <div className="favorito">
                                <span className="fa-stack fa-sm" onClick={this._handleHeart}>
                                    <i className="icono far fa-heart"></i>
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="body-detalle">
                            <div className="img-detalle">
                                <img src={this.state.libros.img} alt="Placeholder image" />
                            </div>
                            <div className="descripcion-detalle">
                                <h2>
                                    {this.state.libros.titulo}
                                </h2>
                                <h3>
                                    {this.state.libros.titulo}
                                </h3>
                                <br />
                                <div>
                                    Detalles de Libro
                                    <hr />
                                </div>
                                <div>
                                    <p>
                                        {`Año:                ${this.state.libros.anioPublicaion}`}
                                    </p>
                                    <p>
                                        {`Paginas:                ${this.state.libros.anioPublicaion}`}
                                    </p>
                                    <p>
                                        {`Idioma:                ${this.state.libros.idioma}`}
                                    </p>
                                </div>
                                <div>
                                    <br />
                                    Descripción
                                    <hr />
                                </div>
                                <div>
                                    <p>
                                        {`${this.state.libros.descripcion}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="footer-detalle">
                            <div className="buttons">
                                <button className="button is-link" onClick={this._handleOpenLibro}>Leer</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}