import { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from '../components/Menu'
import '../css/DetalleLibro.css'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

class BotonSinAquirir extends Component {
    _handleCompra = () => {
        cookies.set('libroActual', this.props.id, { path: '/' } )
        window.location.href= `/venta-libro?id=${this.props.id}`
    }
    _handleAlquiler = () => {
        cookies.set('libroActual', this.props.id, { path: '/' } )
        window.location.href= `/alquiler-libro?id=${this.props.id}`
    }

    render() {
        return (
            <div>
                <div class="buttons">
                    <button class="button is-info" onClick={this._handleAlquiler}>Alquilar</button>
                    <button class="button is-info" onClick={this._handleCompra}>comprar</button>
                </div>
            </div>
        )
    }
}

class BotonAdquirido extends Component {
    render() {
        return (
            <div>
                <div class="buttons">
                    <button class="button is-info">Leer</button>
                </div>
            </div>
        )
    }
}



export default class DetalleLibro extends Component {
    static propTypes = {
        id: PropTypes.string
    }
    state = {
        libros: '',
        heart: false,
        flag: false
    }

    _fetchLibro = ({ id }) => {
        fetch(`http://localhost:8080/api/libros/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ libros: data })
            });
    }
    _handleHeart = ({ id }) => {
        // alert('Hola')
        if (cookies.get('favoritos')) {
            const fav = cookies.get('favoritos')

            fav.map((v) => {
                if (v.libro._id === id) {
                    if (v.estado) {
                        this.setState({ heart: true })
                    } else {
                        this.setState({ heart: false })
                    }
                }
            })
        }
    }
    
    _volverAtras = (e) => {
        window.history.back()
    }
    _handlePagarLibro = (e) => {
        if (!cookies.get('nombreUsuario')) {
            window.location.href = '/login'
        } else {
            window.location.href = "/pagar"
        }
    }



    _handleOutHeart = (e) => {

        if (cookies.get('nombreUsuario')) {
            this.setState({ heart: !this.state.heart })
            const fav = cookies.get('favoritos')
            if (fav) {
                let flag = false
                let indice = 0
                fav.map((l, i) => {
                    if (l.libro._id === this.state.libros._id) {
                        flag = true
                        indice = i
                    }
                })

                if (flag) {
                    if (fav[indice]) {
                        //cambiar estado a flse
                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                usuario: cookies.get('_id'),
                                libro: this.state.libros._id
                            })
                        };
                        fetch('http://localhost:8080/api/favoritos', requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                console.dir(data.message[0])
                            });
                        this._actualizarFavoritosOnCookies()
                    }
                } else {
                    //crear un nuevo favorito a usuario- crear 
                    alert('Creando favorito')
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            usuario: cookies.get('_id'),
                            libro: this.state.libros._id
                        })
                    };
                    fetch('http://localhost:8080/api/favoritos', requestOptions)
                        .then(response => response.json())
                        .then(data => alert(data.message));
                    this._actualizarFavoritosOnCookies()
                }

            } else {
                //Ingresar nuevo favorito - crear
                alert('Creando favorito - nuevo')
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        usuario: cookies.get('_id'),
                        libro: this.state.libros._id
                    })
                };
                fetch('http://localhost:8080/api/favoritos', requestOptions)
                    .then(response => response.json())
                    .then(data => alert(data.message));
                this._actualizarFavoritosOnCookies()
            }

        } else {
            window.location.href = '/login'
        }
        this._actualizarFavoritosOnCookies()
    }

    _actualizarFavoritosOnCookies = () => {
        const id = cookies.get('_id')
        fetch(`http://localhost:8080/api/favoritos/${id}`)
            .then(response => response.json())
            .then(data => {
                cookies.set('favoritos', data.favorito, { path: '/' })
            });
        console.log(cookies.get('favoritos'));
    }

    componentDidMount() {
        const { id } = this.props
        this._fetchLibro({ id })
        this._handleHeart({ id })
        if(cookies.get('nombreUsuario')){
            const misLibros = cookies.get('mislibros')
            misLibros.map(libro => {
                if(libro.libro._id === id){
                    this.setState({flag: true})
                }
            })            
        }
        cookies.set('libroActual', this.props.id, { path: '/' } )

    }

    render() {
        const { _id, img, titulo, numeroPaginas, anioPublicaion, idioma, descripcion, autor } = this.state.libros
        // const { nombre } = this.state.libros.autor
        const colorHeart = this.state.heart ? 'conColor' : 'sinColor'
        return (
            <div className="container-detalle-libro">
                < Menu />
                <div className="detalle-libro">
                    <div className="contenedor">
                        <hr />
                        <div className="header-detalle">
                            <div className="atras">
                                <button className="button is-link" onClick={this._volverAtras}>Atras</button>
                            </div>
                            <div className="favorito">
                                <span className="fa-stack fa-sm" onClick={this._handleOutHeart}>
                                    <i className={`icono far fa-heart ${colorHeart}`}></i>
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="body-detalle">
                            <div className="img-detalle">
                                <img src={img} />
                            </div>
                            <div className="descripcion-detalle">
                                <h2>
                                    {titulo}
                                </h2>
                                <h3>
                                    {console.log(autor)}
                                </h3>
                                <br />
                                <div>
                                    Detalles de Libro
                                    <hr />
                                </div>
                                <div>
                                    <p>
                                        {`Año:                ${anioPublicaion}`}
                                    </p>
                                    <p>
                                        {`Paginas:                ${numeroPaginas}`}
                                    </p>
                                    <p>
                                        {`Idioma:                ${idioma}`}
                                    </p>
                                </div>
                                <div>
                                    <br />
                                    Descripción
                                    <hr />
                                </div>
                                <div>
                                    <p>
                                        {`${descripcion}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="footer-detalle">
                            <div className="buttons">
                                {/* <button className="button is-link" onClick={this._handlePagarLibro}>Alquilar</button>
                                <button className="button is-link" onClick={this._handlePagarLibro}>Comprar</button> */}
                                {
                                    (this.state.flag) ? <BotonAdquirido /> : <BotonSinAquirir id={_id} />
                                }
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>                
            </div>
        )
    }
}