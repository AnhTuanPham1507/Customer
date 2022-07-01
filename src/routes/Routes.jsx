import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Order from '../pages/Order'
import Category from '../pages/Category'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/product/:id' component={Product}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/category/:id' component={Category}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/order' component={Order}/>
        </Switch>
    )
}

export default Routes
