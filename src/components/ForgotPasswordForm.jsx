import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

function ForgotPasswordForm(props) {
    const { onForgotPasswordFormSubmit } = props
        
    const [email, setEmail] = useState('')

    function handleForgotPasswordFormSubmit(e) {
        e.preventDefault()
        onForgotPasswordFormSubmit(email)
    }
    return (
        <>
        <Col className="loginForm">
            <div className="loginForm__title">
                Nhập email để lấy lại mật khẩu
            </div>
            <Form onSubmit={handleForgotPasswordFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control className="loginForm__input" type="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Button className="loginForm__button btn" variant="primary" type="submit">
                    Xác nhận
                </Button>
            </Form>
        </Col>
    </> 
    );
}

export default ForgotPasswordForm;