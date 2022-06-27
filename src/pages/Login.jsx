import React from 'react';

import { Container } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { customerAPI } from '../api/api';
import { addToken } from '../redux/token/tokenSlice';
import { useEffect } from 'react';

function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    function handleLoginSubmit(formValues) {
        const { email, password } = formValues

        async function getToken() {
            try {                
                console.log(email,password)
                const response = await customerAPI.login({email,password})
                if (response.status === 200) {
                    dispatch(addToken(response.data.accessToken))
                    alert('đăng nhập thành công')
                    history.push('/')
                }
                else {
                    alert('đăng nhập thất bại')
                }
            }
            catch (err) {
                alert('đăng nhập thất bại')
                console.log(err)
            }
        }

        getToken()
    }

    return (
        <Container>
            <h1>Đăng nhập</h1>
            <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Container>
    );
}

export default Login;