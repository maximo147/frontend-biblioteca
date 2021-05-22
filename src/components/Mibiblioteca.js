import React, { Component } from 'react'
import Menu from '../components/Menu'
import '../css/Biblioteca.css'
import ListaFavoritos from './FavoritosComp/ListaFavoritos'
import Cookies from 'universal-cookie'
const cookies = new Cookies();


export default class Mibiblioteca extends Component {
    state = {
        misLibros: [],
        estado: false
    }

    componentDidMount() {
        const librosB = []
        if (cookies.get('nombreUsuario')) {
            const fav = cookies.get('mislibros')
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
                            librosB.push(data[0])

                        });
                }
            })
            this.setState({ misLibros: librosB, estado: true })
        } else {
            window.location.href = "/login"
        }
    }


    _handleBack = () => {
        window.history.back()
    }

    _handleRefresh = () => {
        this.setState({estado: true})
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="container-miBiblioteca">
                    <div className="biblioteca">
                        <div className="raya"></div>
                        <button className="button is-link" onClick={this._handleBack}>Atras</button>
                        <div className="raya"></div>
                        <input type="submit" value="Mi Biblioteca v" onClick={this._handleRefresh} />
                    </div>
                    <ListaFavoritos
                            favoritos={this.state.misLibros}
                    />
                </div>
            </div>
        )
    }
}