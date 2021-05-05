import React, { Component } from 'react'

export default class Registrar extends Component {
    state = {
        nombreUsuario: '',
        nombres: '',
        correo: '',
        password: '',
        telefono: ''
    }
    handleChange = (e) => {
        this.setState((prevState) => {
            return {
                [e.target.name]: e.target.value
            }
        })
    }
    _handleRegistrarse = (e) => {
        e.preventDefault()

        // axios.post('http://localhost:8080/api/auth/login', {
        //     correo: this.state.correo,
        //     password: this.state.password,
        //     rol: this.state.rol
        // }).then((response) => {
        //     return response.data
        // }).then((response) => {
        //     if(response.nombreUsuario){
        //         console.log(response)
        //         cookies.set('correo', response.correo, { path: '/' })
        //         cookies.set('nombreUsuario', response.nombreUsuario, { path: '/' })
        //         cookies.set('rol', response.rol, { path: '/' })
        //         window.location.href='./MenuPrincipal'
        //     }else{
        //         alert('El usuario o contraseña son incorrectos')
        //     }
        // })
        // .catch((err) => console.log(err))


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombreUsuario: this.state.nombreUsuario,
                nombres: this.state.nombres,
                correo: this.state.correo,
                password: this.state.password,
                telefono: this.state.telefono
            })
        };
        fetch('http://localhost:8080/api/usuarios', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const { message, errors } = data
                if (errors) {
                    errors.map(error => { 
                        alert(error.msg)
                        console.log(error)
                    })
                }
                alert(message)
            });
    }
    render() {
        return (
            <div>
                <form className="box">
                    <div className="field">
                        {/* <label className="label">Usuario:</label> */}
                        <div className="control">
                            <input className="input" type="text" placeholder="Nombre de usuario" name='nombreUsuario' onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Nombre completo:</label> */}
                        <div className="control">
                            <input className="input" type="text" placeholder="Nombre completo" name='nombres' onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Correo electronico:</label> */}
                        <div className="control">
                            <input className="input" type="email" placeholder="Email" name='correo' onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Contraseña</label> */}
                        <div className="control">
                            <input className="input" type="password" placeholder="Contraseña" name='password' onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        {/* <label className="label">Contraseña</label> */}
                        <div className="control">
                            <input className="input" type="text" placeholder="Telefono" name='telefono' onChange={this.handleChange} />
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
                        <button className="button is-primary" onClick={this._handleRegistrarse}>Ingresar</button>
                    </div>
                </form>
            </div>
        )
    }
}