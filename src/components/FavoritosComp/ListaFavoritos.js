import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Favorito from './Favorito'
import '../../css/Favoritos.css';

export default class ListaFavoritos extends Component {
    static propTypes = {
        favoritos: PropTypes.array
    }

    render() {
        const { favoritos } = this.props;
        return(
            <div className="favoritos-container">
                {   
                    favoritos.map(libros => {
                        return (
                            <div key={libros._id}  >
                                    <Favorito
                                    key={libros.isbn}
                                        _id={libros._id}
                                        titulo={libros.titulo}
                                        img={libros.img}
                                        autor={libros.autor.nombre}
                                        descripcion={libros.descripcion}
                                        anioPublicaion={libros.anioPublicaion}
                                    />                                    
                            </div>
                        )
                    })
                }
            </div>
        )

    }
}