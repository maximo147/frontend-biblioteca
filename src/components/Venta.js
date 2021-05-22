import React from 'react';
import axios from 'axios'
import Cards from 'react-credit-cards'
import Menu from '../components/Menu'
import {
    Card, Button, CardImg, CardTitle, CardGroup,
    CardSubtitle, CardBody
} from 'reactstrap';
import '../css/Venta.css'

import 'react-credit-cards/es/styles-compiled.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

class PaymentForms extends React.Component {


    state = {
        libro: [],
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
        sold: false
    }

    componentDidMount() {
        const libroActual = cookies.get('libroActual')
        if (cookies.get('nombreUsuario')) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    { coleccion: "libro", termino: libroActual })
            };
            fetch('http://localhost:8080/api/busqueda', requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.setState({ libro: data[0] })
                    console.log(data[0])
                });
        } else {
            window.location.href = '/login'
        }



    }

    handleInputChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleFocusChange = (e) => {
        this.setState({
            ...this.state,
            focus: e.target.name
        })
    }

    _actualizarMisLibrosOnCookies = () => {
        const id = cookies.get('_id')
        fetch(`http://localhost:8080/api/mis-libros/${id}`)
            .then(response => response.json())
            .then(data => {
                cookies.set('mislibros', data.mislibros, { path: '/' })
            });
    }

    processPayment = () => {
        try {
            axios.post('http://localhost:8080/api/tarjeta', {
                nombre: this.state.name,
                numero: this.state.number,
                codigo: this.state.cvc,
                fechaVencimiento: this.state.expiry,
            }).then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            }).then((response) => {
                if (response.message === "OK") {
                    const header = {
                        fechaVenta: new Date(),
                        tipoPago: 'TARJETA_DEBITO',
                        total: this.state.libro.precioVenta,
                        usuario: cookies.get('_id')
                    };
                    axios.post('http://localhost:8080/api/ventas', header)
                        .then(response => {
                            if (response.status === 200) {
                                return response.data
                            }
                        })
                        .then(response => {
                            const post = {
                                venta: response.venta._id,
                                libro: cookies.get('libroActual')
                            }
                            axios.post('http://localhost:8080/api/detalle-ventas', post)
                            .then(response => response.data)
                            .then(response => alert(response.message))
                            const post2 = {
                                usuario: cookies.get('_id'),
                                libro: cookies.get('libroActual'),
                                estadoLibro: 'COMPRADO'
                            }
                            axios.post('http://localhost:8080/api/mis-libros', post2)
                            .then(response => response.data)
                            .then(response => alert(response.message))

                            
                            alert('Añadido a libreria')
                            this.setState({ sold: true })
                            this._actualizarMisLibrosOnCookies()
                        });

                } else {
                    alert('Datos incorrectos')
                }
            })
        } catch (error) {
            alert('El usuario o contraseña son incorrectos')
        }
    }
    // console.log("number => ", state.number)
    // console.log("name => ", state.name)
    // console.log("expiry => ", state.expiry)
    // console.log("cvc => ", state.cvc)
    // console.log(JSON.stringify(state))
    render() {
        const { img, titulo, precioVenta, descuentoVenta } = this.state.libro
        return (
            <div className="container-pago">
                <Menu />
                <div className="titulo-pago">
                    <h2 className="subtitle is-2">Realizar Pago</h2>
                </div>
                <div className="container-venta">

                    <div className="container-libro">
                        <CardGroup>
                            <Card>
                                <CardImg top width="100%" src={img} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">{titulo}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Precio: {precioVenta}</CardSubtitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Descuento:<del>{descuentoVenta}</del></CardSubtitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Total: {precioVenta - descuentoVenta}</CardSubtitle>
                                    {/* <CardText></CardText> */}
                                    <Button onClick={() => window.history.back()}>Atras</Button>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </div>
                    <div className="container-targetCard">
                        <div className="card">
                            <div className="card-body">

                                <Cards
                                    number={this.state.number}
                                    name={this.state.name}
                                    expiry={this.state.expiry}
                                    cvc={this.state.cvc}
                                    focused={this.state.focus}
                                />
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="number">Número de la tarjeta</label>
                                        <input
                                            type="text"
                                            name="number"
                                            id="number"
                                            maxLength="16"
                                            className="form-control"
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleFocusChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            maxLength="30"
                                            className="form-control"
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleFocusChange}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="expiry">Fecha de expiración</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                id="expiry"
                                                maxLength="4"
                                                className="form-control"
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleFocusChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="cvc">CVC</label>
                                            <input
                                                type="text"
                                                name="cvc"
                                                id="cvc"
                                                maxLength="3"
                                                className="form-control"
                                                onChange={this.handleInputChange}
                                                onFocus={this.handleFocusChange}
                                            />
                                        </div>
                                    </div>

                                    <button onClick={this.processPayment} type="button" className="btn btn-success btn-block btn-lg">Pagar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default PaymentForms