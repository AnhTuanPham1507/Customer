import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

RegisterForm.propTypes = {
    onRegisterSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const { onRegisterSubmit } = props

    function handleRegisterSubmit(e) {
        e.preventDefault()

        onRegisterSubmit({email,password,name,phone,address})
    }
    return (

        <>
            <Col className="registerForm">
                <div className="registerForm__title">
                    <h1>Tạo tài khoản của bạn</h1>
                    <div className="registerForm__intro-text">
                        Một ID là tất cả những gì bạn cần để truy cập vào tất cả các dịch vụ.
                    </div>
                    <div className="registerForm__intro-link">
                        Đã có ID ?<Link className="registerForm__link" to="/forgotpassword"> Tìm nó ở đây</Link>
                    </div>
                </div>
                <Form  onSubmit={handleRegisterSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Control className="registerForm__input" type="text" placeholder="Tên khách hàng" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control className="registerForm__input" type="text" placeholder="Số điện thoại" minLength={10} name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control className="registerForm__input" type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control className="registerForm__input" type="text" placeholder="Địa chỉ" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control className="registerForm__input" type="password" placeholder="Mật khẩu" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                   
                    <Button className="registerForm__button"  type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </Col>
        </>
    );
}

export default RegisterForm;