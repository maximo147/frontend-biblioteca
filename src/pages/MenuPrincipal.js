import React, { Component } from 'react'
import 'bulma/css/bulma.css';

import { SearchForm } from '../components/SearchForm'
import ListaLibros from '../components/ListaLibros'
import DetalleLibro from '../components/DetalleLibro'
import Menu from '../components/Menu'
import '../css/App.css'

// import Cookies from 'universal-cookie'
// const cookies = new Cookies();


class MenuPrincipal extends Component {
    state = {
        results1: [],
        results2: [],
        results3: [],
    }


    // cerrarSesion = (e) => {
    //     cookies.remove('correo', { path: '/' })
    //     cookies.remove('nombreUsuario', { path: '/' })
    //     cookies.remove('rol', { path: '/' })
    //     window.location.href='./'
    // }
    // componentDidMount(){
    //     if(!cookies.get('nombreUsuario')){
    //         window.location.href='./'
    //     }
    // }

    componentDidMount() {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { coleccion: "libro", termino: "mate" })
        };
        fetch('http://localhost:8080/api/busqueda', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ results1: data[0] })
                console.log(data[0])
            });
        const requestOptions2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { coleccion: "libro", termino: "alge" })
        };
        fetch('http://localhost:8080/api/busqueda', requestOptions2)
            .then(response => response.json())
            .then(data => {
                this.setState({ results2: data[0] })
                console.log(data[0])
            });
        const requestOptions3 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { coleccion: "libro", termino: "prog" })
        };
        fetch('http://localhost:8080/api/busqueda', requestOptions3)
            .then(response => response.json())
            .then(data => {
                this.setState({ results3: data[0] })
                console.log(data[0])
            });
    }

    render() {
        // console.log(cookies.get('correo'))
        // console.log(cookies.get('nombreUsuario'))
        // console.log(cookies.get('rol'))
        const url = new URL(document.location)
        const hasId = url.searchParams.has('id')
        if (hasId) {
            return <DetalleLibro id={url.searchParams.get('id')} />
        }
        return (
            <div className="App">
                <Menu />
                {/* <Title>Buscar Libro</Title> */}
                <div className="SearchForm-wrapper">
                    <SearchForm />
                </div>
                <ListaLibros
                    libros={this.state.results1}
                />

                <ListaLibros
                    libros={this.state.results2}
                />
                <ListaLibros
                    libros={this.state.results3}
                />

                {/* <button onClick={this.cerrarSesion}>Cerrar Sesión</button> */}


            </div>
        )
    }
}
export default MenuPrincipal