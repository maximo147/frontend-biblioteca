import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import '../css/Registrar.css'
const cookies = new Cookies();


export default class Registrar extends Component {
    state = {
        nombreUsuario: '',
        nombres: '',
        correo: '',
        password: '',
        telefono: '',
    }
    _handleChange = (e) => {
        this.setState((prevState) => {
            return {
                [e.target.name]: e.target.value
            }
        })
    }
    _handleRegistrarse = async(e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8080/api/usuarios', {
                nombreUsuario: this.state.nombreUsuario,
                nombres: this.state.nombres,
                correo: this.state.correo,
                password: this.state.password,
                telefono: this.state.telefono
            })
            if(response.status === 200){
                cookies.set('correo', response.data.correo, { path: '/' })
                cookies.set('nombreUsuario', response.data.nombreUsuario, { path: '/' })
                cookies.set('rol', response.data.rol, { path: '/' })
                cookies.set('favoritos', {}, { path: '/' })
                cookies.set('mislibros', {}, { path: '/' })
                window.history.back()
            }
        }catch{
            alert('Datos incorrectos')
        }
    }

    render() {
        return (
            <div className="container-formulario">
                <i class="fas fa-users icono-login"></i>
                <form className="formulario-registro" method>
                    <div className="field">
                        {/* <label className="label">Usuario:</label> */}
                        <div className="control">
                            <i class="fas fa-user iconos"></i>
                            <input
                                className="input is-rounded correo"
                                type="text"
                                name="nombreUsuario"
                                placeholder="Nombre de usuario"
                                onChange={this._handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Nombre completo:</label> */}
                        <div className="control">
                            <i class="fas fa-at iconos"></i>
                            <input
                                className="input is-rounded correo"
                                type="email"
                                name="correo"
                                placeholder="Correo"
                                onChange={this._handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Correo electronico:</label> */}
                        <div className="control">
                        <i class="far fa-user iconos"></i>
                            <input
                                className="input is-rounded correo"
                                type="text"
                                name="nombres"
                                placeholder="Nombre completo"
                                onChange={this._handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Contraseña</label> */}
                        <div className="control">
                            <i class="fas fa-key iconos"></i>
                            <input
                                className="input is-rounded correo"
                                type="password"
                                name="password"
                                placeholder="*********"
                                onChange={this._handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Contraseña</label> */}
                        <div className="control">
                        <i class="fas fa-phone iconos"></i>
                            <input
                                className="input is-rounded correo"
                                type="numeric"
                                name="telefono"
                                placeholder="Telefono"
                                onChange={this._handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="boton">
                            {/* <button className="button is-primary" onClick={this.iniciarSesion}>Ingresar</button> */}
                            <i class="fas fa-backspace icono-back" onClick={this._handleBack}></i>
                            <i class="fas fa-sign-in-alt icono-open2" onClick={this._handleRegistrarse}></i>
                        </div>
                </form>
            </div>
        )
    }
}