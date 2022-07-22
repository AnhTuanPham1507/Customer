import React from 'react';

import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';
import { customerAPI } from '../api/api';

import RegisterForm from '../components/RegisterForm';
import { addToken } from '../redux/token/tokenSlice';
import {validateCustomerData} from '../utils/valiedateCustomerData';


function Register() {
    const history = useHistory()
    const dispatch = useDispatch()

    function handleRegisterSubmit(registerData) {
        if(!validateCustomerData({...registerData})) {
            alert('thông tin bạn điền chưa hợp lệ')
            return
        }
        async function createCustomer() {
            try {
                const res = await customerAPI.register(registerData)
                const token = res.data
                alert('đăng ký thành công')
                dispatch(addToken(token))
                history.push('/')
            }
            catch (error) {
                alert(error.response.data.message)
            }

        }
        createCustomer()
    }

    return (
        <Container>
            <h1>Đăng ký</h1>
            <RegisterForm onRegisterSubmit={handleRegisterSubmit} />
        </Container>
    );
}

export default Register;