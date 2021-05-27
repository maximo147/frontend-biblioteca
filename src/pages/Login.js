import React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.min.css'
import '../css/Login.css'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

const host = (window.location.hostname === 'localhost')
    ? ('http://localhost:8080')
    : ('https://biblioteca-virtual-node.herokuapp.com')


class Login extends React.Component {

    state = {
        correo: '',
        password: '',
        rol: 'USUARIO_ROL'
    }

    _handleChange = (e) => {
        this.setState((prevState) => {
            return {
                [e.target.name]: e.target.value,
                favoritos: [],
                misLibros: []
            }
        })
    }


    iniciarSesion = async (e) => {
        if (this.state.correo === '' || this.state.password === '') {
            alert('Faltan Datos')
        } else {
            try {
                const response = await axios.post(`${host}/api/auth/login`, {
                    correo: this.state.correo,
                    password: this.state.password,
                })
                //
                if (response.status === 200) {
                    cookies.set('correo', response.data.correo, { path: '/' })
                    cookies.set('nombreUsuario', response.data.nombreUsuario, { path: '/' })
                    cookies.set('_id', response.data._id, { path: '/' })

                    const favoritos = await axios.get(`${host}/api/favoritos/${response.data._id}`)
                    if (favoritos.status === 200) {
                        cookies.set('favoritos', favoritos.data.favorito, { path: '/' })
                        this.setState({ favoritos: favoritos.data })
                    }
                    const misLibros = await axios.get((`${host}/api/mis-libros/${response.data._id}`))
                    if (misLibros.status === 200) {
                        cookies.set('mislibros', misLibros.data.mislibros, { path: '/' })
                        this.setState({ misLibros: misLibros.data })
                        window.history.back()
                    }
                } else {
                    alert('sff')
                }
            } catch (error) {
                alert('Datos incorrectos')
            }
        }
    }

    componentDidMount() {
        if (cookies.get('nombreUsuario')) {
            window.location.href = './MenuPrincipal'
        }
    }

    _handleBack = () => {
        window.history.back();
    }

    render() {
        return (
            <div className="container-login">
                <div className='caja-login'>
                    <i class="fas fa-users icono-login"></i>
                    <form className="caja">
                        <div className="field cajas-texto">
                            <div className="control">
                                <i class="fas fa-user icono-user"></i>
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
                        <div className="field cajas-texto">
                            <div className="control">
                                <i class="fas fa-key icono-key"></i>
                                <input
                                    className="input is-rounded password"
                                    type="password"
                                    name="password"
                                    placeholder="*********"
                                    onChange={this._handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="boton">
                            {/* <button className="button is-primary" onClick={this.iniciarSesion}>Ingresar</button> */}
                            <span onClick={this._handleBack}>
                                <i class="fas fa-backspace icono-back"></i>
                            </span>
                            <span onClick={this.iniciarSesion}>
                                <i class="fas fa-sign-in-alt icono-open"></i>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default Login