import React from 'react';
import { useSelector } from 'react-redux';
import { customerAPI } from '../api/api';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import useQuery from '../hooks/useQuery';

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
        <UpdatePasswordForm onUpdatePasswordFormSubmit={handleUpdatePasswordFormSubmit}/>
    );
}

export default UpdatePassword;