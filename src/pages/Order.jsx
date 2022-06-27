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
                if(res.status === 200) {
                    const data = res.data
                    setOrders(data)
                } else {
                    console.log(res)
                }
           } catch (error) {
                console.log(error)
           }
        }
        getOrders()
    }, [token])

    return (
        <OrderTable orders={orders} />
    );
}

export default Order;   