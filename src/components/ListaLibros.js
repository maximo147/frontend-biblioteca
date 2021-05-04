import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Libro from './Libro'
import '../css/Libro.css';

export default class ListaLibros extends Component {
    static propTypes = {
        libros: PropTypes.array
    }

    render() {
        const { libros } = this.props;
        return(
            <div className="LibrosList">
                {   
                    libros.map(libros => {
                        return (
                            <div key={libros._id}  className="LibrosList-Item">
                                    <Libro
                                    key={libros.isbn}
                                        _id={libros._id}
                                        titulo={libros.titulo}
                                        img={libros.img}
                                        autor={libros.autor.nombre}
                                    />                                    
                            </div>
                        )
                    })
                }
            </div>
        )

    }
}