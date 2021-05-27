import React, { Component } from 'react'
import 'bulma/css/bulma.css';

// import { SearchForm } from '../components/SearchForm'
import ListaLibros from '../components/ListaLibros'
import DetalleLibro from '../components/DetalleLibro'
import Menu from '../components/Menu'
import '../css/App.css'

// import Cookies from 'universal-cookie'
// const cookies = new Cookies();

const host = (window.location.hostname === 'localhost')
? ('http://localhost:8080')
: ('https://biblioteca-virtual-node.herokuapp.com')


class MenuPrincipal extends Component {
    state = {
        results1: [],
        results2: [],
        results3: [],
        favoritos: [],
        search: false,
        inputMovie: '',
        busquedas: [],
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
                { coleccion: "libro", termino: "mysql" })
        };
        fetch(`${host}/api/busqueda`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ results1: data[0] })
                console.log(data[0])
            });
        const requestOptions2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { coleccion: "libro", termino: "php" })
        };
        fetch(`${host}/api/busqueda`, requestOptions2)
            .then(response => response.json())
            .then(data => {
                this.setState({ results2: data[0] })
                console.log(data[0])
            });
        const requestOptions3 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { coleccion: "libro", termino: "bases" })
        };
        fetch(`${host}/api/busqueda`, requestOptions3)
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
        try {
            if (this.state.inputMovie === '') {
                alert('Campos vacios')
            } else {
                if (this.state.inputMovie.includes('++')) {
                    alert('Cadena incorreta')
                } else if (this.state.inputMovie.length <= 2) {
                    alert('Cadena insuficiente')
                } else {
                    e.preventDefault()
                    const { inputMovie } = this.state

                    const requestOptions4 = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            { coleccion: "libro", termino: inputMovie })
                    };
                    fetch(`${host}/api/busqueda`, requestOptions4)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({ busquedas: data[0] })
                            this.setState({ search: true })
                        });
                }
            }
        } catch {

        } finally {
            this.setState({ inputMovie: '' })
            document.getElementById('busqueda').value = ''
        }

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

                <div className="SearchForm-wrapper animate__bounceIn">
                    {/* <SearchForm _handleSearch={this._handleSearch} /> */}
                    <form onSubmit={this._handleSearch}>
                        <div className="busqueda">
                            <div className="control">
                                <i className="fas fa-search icono-search" onClick={this._handleSearch} ></i>
                                <input
                                    className="input is-rounded search"
                                    type="text"
                                    id="busqueda"
                                    placeholder="Buscar libro🌝"
                                    onChange={this._handleChange}
                                />
                            </div>
                        </div>
                    </form>
                    {/* <h1 class="animate__animated animate__bounce">An animated element</h1> */}
                </div>
                {
                    (this.state.search) ?
                        <ListaLibros
                            libros={this.state.busquedas}
                        />
                        :
                        <div>No hay Busquedas</div>

                }

                <div className='titleCategoria animate__fadeInUp'>
                    <div className='categoriaTitulo'>
                        Lo más visto
                    </div>
                </div>
                <ListaLibros
                    libros={this.state.results1}
                />

                <div className='titleCategoria'>
                    <div className='categoriaTitulo'>
                        Matemática
                    </div>
                </div>
                <ListaLibros
                    libros={this.state.results2}
                />

                <div className='titleCategoria'>
                    <div className='categoriaTitulo'>
                        Matemática
                    </div>
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