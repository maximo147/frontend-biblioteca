import React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.min.css'
import '../css/Login.css'
import logo from '../assets/Innova-logo-retina.png'

import Cookies from 'universal-cookie'
const cookies = new Cookies();


class Login extends React.Component {

    state = {
        correo: '',
        password: '',
        rol: 'USUARIO_ROL'
    }

    handleChange = (e) => {
        this.setState((prevState) => {
            return {
                [e.target.name]: e.target.value
            }
        })
    }

    iniciarSesion = (e) => {
        try {
            
            axios.post('http://localhost:8080/api/auth/login', {
                correo: this.state.correo,
                password: this.state.password,
                rol: this.state.rol
            }).then((response) => {
                return response.data
            }).then((response) => {
                if(response.nombreUsuario){
                    console.log(response)
                    cookies.set('correo', response.correo, { path: '/' })
                    cookies.set('nombreUsuario', response.nombreUsuario, { path: '/' })
                    cookies.set('rol', response.rol, { path: '/' })
                    window.location.href='./MenuPrincipal'
                }else{
                    alert('El usuario o contraseña son incorrectos')
                }
            })
            .catch((err) => console.log(err))
            e.preventDefault();            
        } catch (error) {
            alert('Error')
        }

    }

    componentDidMount(){
        if(cookies.get('nombreUsuario')){
            window.location.href='./MenuPrincipal'
        }
    }

    render(){
        return (
            <div className='caja-login'>
                <div className='logo'>
                    <img src={logo} alt='' />
                </div>

                <form className="box">
                    <div className="field">
                        <label className="label">Correo institucional</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="example@innova.pe" name='correo' onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Contraseña</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="********" name='password' onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="caja-combobox">
                        <div className="control">
                            {/* <div className="select">
                                <select onChange={this.handleChange} name='rol'>
                                    <option value="ALUMNO_ROL">Estudiante</option>
                                    <option value="PROFESOR_ROL">Profesor</option>
                                </select>
                            </div> */}
                        </div>
                    </div>

                    <div className="boton">
                        <button className="button is-primary" onClick={this.iniciarSesion}>Ingresar</button>
                    </div>
                </form>

            </div>

        )
    }
}

export default Login