import React from 'react';
import { useSelector } from 'react-redux';
import { customerAPI } from '../api/api';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import useQuery from '../hooks/useQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAngleRight,faCartXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function UpdatePassword(props) {
    const token = useQuery().get('token')
    const history = useHistory()

    useEffect(() => {
        async function checkToken() {
            try {
                await customerAPI.getInfo(token)
            } catch (error) {
                alert(error.response.data.message)
                history.push('/')
            }
        }
        checkToken()
    },[token])

    async function handleUpdatePasswordFormSubmit(newPassword) {
        try {
            await customerAPI.updatePassword(token,newPassword)
            history.push('/login')

        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <Container>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Cập nhật mật khẩu</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <Link to="/login">Đăng nhập</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Cập nhật mật khẩu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <UpdatePasswordForm onUpdatePasswordFormSubmit={handleUpdatePasswordFormSubmit}/>
        </Container>
    );
}

export default UpdatePassword;