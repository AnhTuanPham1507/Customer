import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

LoginForm.propTypes = {
    onLoginSubmit: PropTypes.func.isRequired
};

function LoginForm(props) {
    const { onLoginSubmit } = props

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginSubmit(e) {
        e.preventDefault()
        const formvalues = {
            phone,
            password
        }
        onLoginSubmit(formvalues)
    }

    return (
        <>
            <Col className="loginForm">
                <div className="loginForm__title">
                    Đăng nhập vào trang wed
                </div>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3">
                        
                        <Form.Control className="loginForm__input" type="text" placeholder="Số điện thoại" minLength={10} name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        
                        <Form.Control className="loginForm__input" type="password" placeholder="Mật khẩu" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="loginForm__link">
                        <Link to="/forgotpassword">Quên mật khẩu? <FontAwesomeIcon className="userCircle" icon={faUpRightFromSquare} /></Link>
                    </Form.Group>
                    <Form.Group  className="loginForm__link">
                        <span className="loginForm__notlink">Chưa có tài khoản?</span>
                        <Link to="/register"> Tạo ngay. <FontAwesomeIcon className="userCircle" icon={faUpRightFromSquare} /></Link>
                    </Form.Group>
                    <Button className="loginForm__button" type="submit">
                        Xác nhận
                    </Button>
                </Form>
            </Col>
        </>
    );
}

export default LoginForm;