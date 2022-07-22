import React from 'react';

import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import { customerAPI } from '../api/api';

import RegisterForm from '../components/RegisterForm';
import { addToken } from '../redux/token/tokenSlice';
import {validateCustomerData} from '../utils/valiedateCustomerData';

import { faAngleRight,faCartXmark } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';


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
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Đăng ký</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <Link to="/login">Đăng nhập</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Đăng ký</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RegisterForm onRegisterSubmit={handleRegisterSubmit} />
        </Container>
    );
}

export default Register;