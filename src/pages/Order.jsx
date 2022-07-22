import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { exportOrderAPI } from '../api/api';
import OrderTable from '../components/OrderTable';


function Order() {
    const [orders, setOrders] = useState([])
    const token = useSelector(state => state.token.value)

    useEffect(() => {
        async function getOrders () {
            try {
                const res = await exportOrderAPI.getByCustomerId(token)
                const data = res.data
                setOrders(data)
           } catch (error) {
                alert(error.response.data.message)
           }
        }
        getOrders()
    }, [token])

    return (
        <OrderTable orders={orders} />
    );
}

export default Order;   