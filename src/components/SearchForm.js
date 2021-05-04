import React, { Component } from 'react'
// const API_KEY = '4cc2d235'
export class SearchForm extends Component {
    state = {
        inputMovie: ''
    }
    _handleChange = (e) => {
        this.setState({ inputMovie: e.target.value })
    }

    _handleSubmit = (e) => {
        e.preventDefault()
        const { inputMovie } = this.state
        // fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}`)
        // fetch(`http://localhost:8080?title=${inputMovie}`)
        // .then(data => data.json())
        // .then(results => {
        //     console.log(results)
        // })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: inputMovie })
        };
        fetch('http://localhost:8080/api/libros', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
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