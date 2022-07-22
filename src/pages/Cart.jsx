import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import { Form} from 'react-bootstrap';

import numberWithCommas from '../utils/numberWithCommas'
import { exportOrderAPI } from '../api/api'
import { useDispatch } from 'react-redux'
import { removeAll } from '../redux/shopping-cart/cartItemsSlide'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
const Cart = () => {
    const token = useSelector(state => state.token.value)

    const cartItems = useSelector((state) => state.cartItems.value)

    const dispatch = useDispatch()

    const history = useHistory()

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalBill, setTotalBill] = useState(0)

    const [address, setAddress] = useState('')

    const [paymentMethod, setPaymentMethod] = useState('INPERSON')

    useEffect(() => {
        setTotalBill(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.soldPrice)), 0))
        setTotalProducts(cartItems.length)
        
    }, [cartItems])

    async function handleCreateOrder() {
        try {
            if(!token) {
                alert('vui lòng đăng nhập')
                history.push('/login')
                return
            }
            const exportOrder = {
                totalBill,
                paymentMethod,
                shipAddress: address,
            }
    
            const purchaseProducts = cartItems.map(cart => {
                return {
                    warehouseId: cart._id,
                    productId: cart.product._id,
                    price: cart.soldPrice,
                    quantity: cart.quantity,
                }
            })
            const res = await exportOrderAPI.create(token,{exportOrder, purchaseProducts})
            if(paymentMethod === 'INPERSON'){
                alert('đặt hàng thành công')
                dispatch(removeAll())
                history.push('/order')
            } else {
                window.location.href= res.data.payUrl
            }
            
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Helmet title="Giỏ hàng">

            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Giỏ hàng của bạn</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Giỏ hàng của bạn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="cart">
                <div className="cart__list">
                    <div className="shopping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Tạm tính</th>
                                    <th></th>
                                </tr>
                            </thead>
                                {
                                    cartItems.map((item) => (
                                        <CartItem item={item} key={item._id}/>
                                    ))
                                }
                        </table>
                    </div>
                    
                    <div className="continue__btn">
                        <Link to="/catalog">
                            <Button className="continue__btn">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="cart__discount">
                    </div>
                    <div className="cart__total">
                        <h6>Tổng cộng</h6>
                        <ul>
                            <li>Tạm tính: <span>{numberWithCommas(Number(totalBill))}</span></li>
                            <li>Giảm Giá :<span>0</span></li>
                            <li>Tổng tiền :<span>{numberWithCommas(Number(totalBill))}</span></li>
                            
                        </ul>
                        
                        <Link to="/checkout">
                            <Button className="check_out">
                            Thanh toán
                            </Button>
                        </Link>

                    </div>
                </div>


                {/* <div className="cart__info">
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Phương thức thanh toán</Form.Label>
                                <Form.Select 
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="INPERSON">thanh toán khi nhận hàng</option>
                                    <option value="MOMO">thanh toán qua MoMo</option>
                                </Form.Select>
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
                </div> */}
            </div>
        </Helmet>
    )
}

export default Cart
