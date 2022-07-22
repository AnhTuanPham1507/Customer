import React from 'react';

import { Container } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { customerAPI } from '../api/api';
import { addToken } from '../redux/token/tokenSlice';
import { useEffect } from 'react';

import {validatePhone} from '../utils/valiedateCustomerData'

function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    function handleLoginSubmit(formValues) {

    }

    return (
        <Container>
            <h1>Đăng nhập</h1>
            <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Container>
    );
}

export default Login;