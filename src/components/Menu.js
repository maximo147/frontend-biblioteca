
import React, { Component } from 'react';
import '../css/Menu.css'
import logo from '../assets/favicon.ico'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

export default class Menu extends Component {

    _handleLoguearse = (e) => {
        if(!cookies.get('nombreUsuario')){
            window.location.href = '/login'
        }else{
            alert('Holaaaaa')
        }
    }
    _handleRegistrarse = (e) => {
        window.location.href = '/registrar'
    }

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
                        <img src={logo} alt="fbfb" />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
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
                                </li>
                            </ul>

                                <button className="btn btn-outline-success boton" type="submit" onClick={this._handleLoguearse}>SingIn</button>
                                <button className="btn btn-outline-success boton" type="submit" onClick={this._handleRegistrarse}>SingUp</button>

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}