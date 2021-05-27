import React, { Component } from 'react'
import Menu from '../components/Menu'
import '../css/Biblioteca.css'
import ListaFavoritos from './FavoritosComp/ListaFavoritos'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const host = (window.location.hostname === 'localhost')
    ? ('http://localhost:8080')
    : ('https://biblioteca-virtual-node.herokuapp.com')

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
                    fetch(`${host}/api/busqueda`, requestOptions)
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
        this.setState({ estado: true })
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="container-miBiblioteca">
                    <div className="biblioteca">
                        <div className="raya"></div>
                        <i class="fas fa-eye ojo-icono" onClick={this._handleRefresh}></i>
                        <div className="raya"></div>
                    </div>
                    <div className="lista">
                        <ListaFavoritos
                            favoritos={this.state.misLibros}
                        />
                    </div>

                </div>
            </div>
        )
    }
}