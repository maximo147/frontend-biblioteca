import React, { Component } from 'react'
// const API_KEY = '4cc2d235'
export class SearchForm extends Component {
    state = {
        inputMovie: '',
        busquedas: []
    }
    _handleChange = (e) => {
        this.setState({ inputMovie: e.target.value })
    }


    _handleSearch = (e) => {
        e.preventDefault()
        const { inputMovie } = this.state

        const requestOptions3 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { coleccion: "libro", termino: inputMovie })
        };
        fetch('http://localhost:8080/api/busqueda', requestOptions3)
            .then(response => response.json())
            .then(data => {
                this.setState({ busquedas: data[0] })
            });
    }

    render() {
        const { _handleSearch } = this.props
        return (
            <form onSubmit={_handleSearch}>
                <div className="field has-addons">
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

        )
    }
}