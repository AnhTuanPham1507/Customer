import React, { useState } from 'react';
import { customerAPI } from '../api/api';
import ForgotPasswordForm from '../components/ForgotPasswordForm';


function ForgotPassword(props) {
    const [isSent, setIsSent] = useState(false)
    async function handleForgotPasswordFormSubmit(email) {
        try {
            await customerAPI.forgotPassword(email)
            setIsSent(true)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        !isSent ?
       <ForgotPasswordForm onForgotPasswordFormSubmit={handleForgotPasswordFormSubmit} /> :
       <div>vui lòng truy cập email để cập nhật mật khẩu mới</div>
    );
}

export default ForgotPassword;