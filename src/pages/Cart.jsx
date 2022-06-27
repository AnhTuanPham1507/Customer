import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import { Form} from 'react-bootstrap';

import numberWithCommas from '../utils/numberWithCommas'
import { exportOrderAPI } from '../api/api'
import { useDispatch } from 'react-redux'
import { removeAll } from '../redux/shopping-cart/cartItemsSlide'

const Cart = () => {

    const cartItems = useSelector((state) => state.cartItems.value)

    const dispatch = useDispatch()

    const history = useHistory()

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalBill, setTotalBill] = useState(0)

    const [address, setAddress] = useState('')

    useEffect(() => {
        setTotalBill(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.soldPrice)), 0))
        setTotalProducts(cartItems.length)
    }, [cartItems])

    async function handleCreateOrder() {
        try {
            const exportOrder = {
                totalBill,
                employee: '629ef3d6a8dd7a3001491a7b',
                customer: '62a436b7f1e2ce8c14ecbd16',
                shipAddress: address
            }
    
            const purchaseProducts = cartItems.map(cart => {
                return {
                    warehouseId: cart._id,
                    productId: cart.product._id,
                    price: cart.soldPrice,
                    quantity: cart.quantity,
                }
            })
            const res = await exportOrderAPI.create({exportOrder, purchaseProducts})
            if(res.status === 201) {
                alert('đặt hàng thành công')
                dispatch(removeAll())
                history.push('/order')
            } else {
                alert('đặt hàng thất bại')
                console.log(res)
            }
        } catch (error) {
            alert('đặt hàng thất bại')
            console.log(error)
        }
    }

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__list">
                    {
                        cartItems.map((item) => (
                            <CartItem item={item} key={item._id}/>
                        ))
                    }
                </div>
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                        </p>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Địa chỉ giao hàng</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="địa chỉ giao hàng" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{numberWithCommas(Number(totalBill))}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button onClick={handleCreateOrder} size="block">
                            Đặt hàng
                        </Button>
                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
