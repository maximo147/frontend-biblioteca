import { React } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../pages/Login';
import Registrar from '../components/Registrar';
import MenuPrincipal from '../pages/MenuPrincipal'
import IFrame from '../components/IFrame'
import Pagar from '../components/Pagar'
import Favoritos from '../components/Favoritos'
import DetalleLibro from '../components/DetalleLibro'
import Mibiblioteca from '../components/Mibiblioteca'
import Venta from '../components/Venta'
import Alquiler from '../components/Alquilar'
import NotFound from '../pages/NotFound'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <MenuPrincipal />
                    {/* <Login /> */}
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/pagar'>
                    <Pagar />
                </Route>
                <Route path='/registrar'>
                    <Registrar />
                </Route>
                <Route path='/favoritos'>
                    <Favoritos />
                </Route>
                <Route path='/venta-libro'>
                    <Venta />
                </Route>
                <Route path='/alquiler-libro'>
                    <Alquiler />
                </Route>
                <Route exact path='/miBiblioteca'>
                    <Mibiblioteca />
                </Route>
                <Route exact path='/MenuPrincipal'>
                    <MenuPrincipal />
                </Route>

                <Route path='/pdf/visualizar'>
                    <IFrame />
                </Route>
                <Route path='*'>
                    <NotFound />
                </Route>
                <Route exact path='/:id'>
                    <DetalleLibro />
                </Route>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;

