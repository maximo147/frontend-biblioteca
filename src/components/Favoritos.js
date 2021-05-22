import React, { Component } from 'react'
import Menu from '../components/Menu'

import ListaFavoritos from './FavoritosComp/ListaFavoritos'
import '../css/Favoritos.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies();


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
                    fetch('http://localhost:8080/api/busqueda', requestOptions)
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

    _handleBack = () => {
        window.history.back()
    }


    render() {

        return (
            <div>
                <Menu />

                <div className="container-favoritos">
                    <div className="favoritos">
                        <div className="raya"></div>
                        <button className="button is-link" onClick={this._handleBack}>Atras</button>
                        <div className="raya"></div>
                        
                        <input type="submit" value="Mis Favoritos v" onClick={this._handleRefresh} />
                        <ListaFavoritos
                            favoritos={this.state.librosFavoritos}
                        />
                    </div>
                </div>
            </div>
        )
    }
}