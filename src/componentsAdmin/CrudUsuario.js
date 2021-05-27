import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap'
import axios from 'axios'

export default class CrudUsuario extends React.Component {
    state = {
        data: [],
        modalActualizar: false,
        modalInsertar: false

    }

    axiosDatos = async () => {
        const response = await axios.get("http://localhost:8080/api/usuarios")
        return response.data
    }

    async componentDidMount() {
        const data = await this.axiosDatos()
        const { usuarios } = data
        this.setState({ data: usuarios })
    }

    mostrarModalInsertar = () => {
        this.setState({
          modalInsertar: true,
        });
    }
    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    }

    render() {
        return (
            <>
                <Container>
                    <Button color="success" onClick={this.mostrarModalInsertar}>Insertar</Button>
                    <Table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Nombre de usuario</td>
                                <td>Correo</td>
                                <td>Nombres</td>
                                <td>Telefono</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                this.state.data.map((elemento) => (
                                    <tr key={elemento._id}>
                                        <td>1</td>
                                        <td>{elemento.nombreUsuario}</td>
                                        <td>{elemento.correo}</td>
                                        <td>{elemento.nombres}</td>
                                        <td>{elemento.telefono}</td>
                                        <td><Button color="primary">Editar</Button></td>
                                        <td><Button color="danger">Eliminar</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>


                {/* <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id:
              </label>

                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={this.state.form.id}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Personaje:
              </label>
                            <input
                                className="form-control"
                                name="personaje"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.personaje}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Anime:
              </label>
                            <input
                                className="form-control"
                                name="anime"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.anime}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.editar(this.state.form)}
                        >
                            Editar
            </Button>
                        <Button
                            color="danger"
                            onClick={() => this.cerrarModalActualizar()}
                        >
                            Cancelar
            </Button>
                    </ModalFooter>
                </Modal> */}



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Personaje</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Nombre de usuario:
                            </label>
                            <input
                                className="form-control"
                                name="nomUsuario"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Correo:
                            </label>
                            <input
                                className="form-control"
                                name="correo"
                                type="email"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Nombres completos:
                            </label>
                            <input
                                className="form-control"
                                name="nombres"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Teléfono:
                            </label>
                            <input
                                className="form-control"
                                name="telefono"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Rol:
                            </label>
                            <select name="rol">
                                <option value="ADMIN_ROL">Administrador</option>
                                <option value="USUARIO_ROL">Usuario</option>
                            </select>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.insertar()}
                        >
                            Insertar
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={() => this.cerrarModalInsertar()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}