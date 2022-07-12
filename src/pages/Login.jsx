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
        const { phone, password } = formValues
        if(!validatePhone(phone)){
            alert('số điện thoại không hợp lệ')
            return
        }
        async function getToken() {
            try {                
                const response = await customerAPI.login({phone,password})
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