import React, { Component } from 'react'
import 'bulma/css/bulma.css';

// import { SearchForm } from '../components/SearchForm'
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
        favoritos: [],
        search: false,
        inputMovie: '',
        busquedas: []
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
    _handleChange = (e) => {
        this.setState({ inputMovie: e.target.value })
    }

    _handleSearch = (e) => {
        e.preventDefault()
        const { inputMovie } = this.state

        const requestOptions4 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { coleccion: "libro", termino: inputMovie })
        };
        fetch('http://localhost:8080/api/busqueda', requestOptions4)
            .then(response => response.json())
            .then(data => {
                this.setState({ busquedas: data[0] })
                this.setState({ search: true })
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
                <div className="SearchForm-wrapper">
                    {/* <SearchForm _handleSearch={this._handleSearch} /> */}
                    <form onSubmit={this._handleSearch}>
                        <div className="field has-addons busqueda">
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Buscar libro"
                                    onChange={this._handleChange}
                                />
                            </div>
                            <div className="control">
                                <button className="button is-info">
                                    Search
                        </button>
                            </div>
                        </div>
                    </form>
                </div>
                {
                    (this.state.search) ?
                        <ListaLibros
                            libros={this.state.busquedas}
                        />
                        :
                        <div>No hay Busquedas</div>

                }

                <div className='titleCategoria'>
                    <div className='categoriaTitulo'>
                        Matemática
                    </div>
                    <div className='raya'></div>
                </div>
                <ListaLibros
                    libros={this.state.results1}
                />

                <div className='titleCategoria'>
                    <div className='categoriaTitulo'>
                        Matemática
                    </div>
                    <div className='raya'></div>
                </div>
                <ListaLibros
                    libros={this.state.results2}
                />

                <div className='titleCategoria'>
                    <div className='categoriaTitulo'>
                        Matemática
                    </div>
                    <div className='raya'></div>
                </div>
                <ListaLibros
                    libros={this.state.results3}
                />

                {/* <button onClick={this.cerrarSesion}>Cerrar Sesión</button> */}


            </div>
        )
    }
}
export default MenuPrincipal