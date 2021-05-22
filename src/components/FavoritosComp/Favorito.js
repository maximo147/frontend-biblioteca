import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie'
const cookies = new Cookies();


class BotonSinAquirir extends Component {
    render() {
        return (
            <div>
                <div class="buttons">
                    <button class="button is-info">Alquilar</button>
                    <button class="button is-info">comprar</button>
                </div>
            </div>
        )
    }
}

class BotonAdquirido extends Component {
    render() {
        return (
            <div>
                <div class="buttons">
                    <button class="button is-info">Leer</button>
                </div>
            </div>
        )
    }
}

export default class Favorito extends Component {
    state = {
        flag: false
    }
    static propTypes = {
        _id: PropTypes.string,
        titulo: PropTypes.string,
        img: PropTypes.string,
        autor: PropTypes.string,
        descripcion: PropTypes.string
    }


    componentDidMount() {
        const misLibros = cookies.get('mislibros')
        const { _id  } = this.props
        misLibros.map(libro => {
            if(libro.libro._id === _id){
                this.setState({flag: true})
            }
        })
    }


    render() {
        const { _id, titulo, img, autor, anioPublicaion, descripcion } = this.props
        
        return (
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={img} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{titulo}</h5>
                            <p className="card-text">{autor}</p>
                            <p className="card-text">{anioPublicaion}</p>
                            <p className="card-text">{descripcion}</p>
                        </div>
                        {
                            (this.state.flag) ? <BotonAdquirido /> : <BotonSinAquirir />
                        }
                    </div>
                </div>
            </div>
        )
    }
}