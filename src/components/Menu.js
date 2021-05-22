
import React, { Component } from 'react';
import '../css/Menu.css'
import logo from '../assets/favicon.ico'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

class BotonesLogin extends React.Component {
    _handleLoguearse = (e) => {
        if (!cookies.get('nombreUsuario')) {
            window.location.href = '/login'
        }
    }
    _handleRegistrarse = (e) => {
        window.location.href = '/registrar'
    }
    render() {
        return (
            <div>
                <button className="btn btn-outline-success boton" type="submit" onClick={this._handleLoguearse}>SingIn</button>
                <button className="btn btn-outline-success boton" type="submit" onClick={this._handleRegistrarse}>SingUp</button>
            </div>
        )
    }
}

class BotonesOut extends React.Component {

    _handleSalir = () => {
        cookies.remove('correo', { path: '/' })
        cookies.remove('nombreUsuario', { path: '/' })
        cookies.remove('rol', { path: '/' })
        cookies.remove('favoritos', { path: '/' })
        cookies.remove('_id', { path: '/' })
        window.location.reload(true);
    }
    render() {
        return (
            <div>
                <div>
                    <ul className="listaItems">
                        <li>
                            <a className="firstClass" href="/miBiblioteca" s>Mi Biblioteca</a>
                        </li>
                        <li>
                            <a className="firstClass" href="/favoritos" >Mis Favoritos</a>
                        </li>
                        
                        <li className="firstClass">
                            <a>Hola {
                                cookies.get('nombreUsuario')
                            }</a>
                        </li>
                        <li className="firstClass">
                            <button className="btn btn-outline-success boton" type="submit" onClick={this._handleSalir}>Salir</button>  
                        </li>                        
                    </ul>  
                </div>

            </div>
        )
    }
}

export default class Menu extends Component {




    handleChange = (e) => {
        this.setState((prevState) => {
            return {
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        return (
            <div className='menu'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <img src={logo} />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                                </li> */}
                            </ul>
                            {
                                (!cookies.get('nombreUsuario')) ? <BotonesLogin /> : <BotonesOut />
                            }


                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}