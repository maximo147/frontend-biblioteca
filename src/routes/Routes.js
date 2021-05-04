import { React } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../pages/Login';
import MenuPrincipal from '../pages/MenuPrincipal'
import IFrame from '../components/IFrame'

import DetalleLibro from '../components/DetalleLibro'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <MenuPrincipal />
                    {/* <Login /> */}
                </Route>
                <Route path='/login'>
                    <Login />
                </Route> 
                <Route exact path='/MenuPrincipal'>
                    <MenuPrincipal />
                </Route>
                <Route exact path='/:id'>
                    <DetalleLibro />
                </Route>               
                <Route path='/pdf/visualizar'>
                    <IFrame />
                </Route>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;

