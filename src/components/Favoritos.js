import React, { Component } from 'react'
import Menu from '../components/Menu'

import ListaFavoritos from './FavoritosComp/ListaFavoritos'
import '../css/Favoritos.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies();


const host = (window.location.hostname === 'localhost')
    ? ('http://localhost:8080')
    : ('https://biblioteca-virtual-node.herokuapp.com')

export default class Favoritos extends Component {
    state = {
        librosFavoritos: [],
        estado: false
    }

    _handleRefresh = () => {
        this.setState({ estado: !this.state.estado })
    }

    componentDidMount() {
        const librosF = []
        if (cookies.get('nombreUsuario')) {
            const fav = cookies.get('favoritos')
            fav.map(libro => {
                if (libro.estado) {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            { coleccion: "libro", termino: libro.libro._id })
                    };
                    fetch(`${host}/api/busqueda`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            librosF.push(data[0])
                        });
                }
            })
            this.setState({ librosFavoritos: librosF })

        } else {
            window.location.href = "/login"
        }
    }

    // _handleBack = () => {
    //     window.history.back()
    // }


    render() {

        return (
            <div>
                <Menu />

                <div className="container-favoritos">
                    <div className="favoritos">
                        <div className="raya"></div>
                        <i class="fas fa-eye ojo-icono" onClick={this._handleRefresh}></i>
                        <div className="raya"></div>
                        <div className="lista2">
                            <ListaFavoritos
                                favoritos={this.state.librosFavoritos}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}