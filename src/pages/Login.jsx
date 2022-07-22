import React from 'react';

import { Container } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { customerAPI } from '../api/api';
import { addToken } from '../redux/token/tokenSlice';
import { useEffect } from 'react';
import { faAngleRight,faCartXmark } from '@fortawesome/free-solid-svg-icons';

import {validatePhone} from '../utils/valiedateCustomerData'
import { Link } from 'react-router-dom';

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
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Đăng nhập</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Đăng nhập</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Container>
    );
}

export default Login;