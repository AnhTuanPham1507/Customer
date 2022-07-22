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
import Cart from './Cart';
import CartForCheckout from './CartForCheckout';
const Checkout = () => {
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

    async function handleCreateOrder(e) {
        e.preventDefault()
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
            if(paymentMethod === 'INPERSON') {
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
        <Helmet title="Thanh toán">
            <CartForCheckout></CartForCheckout>
            
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
                    
                </div> */}

            
            
                    <div class="checkout__form">
                        <h4 class="checkout__title">Điền thông tin gửi hàng</h4>
                        <Form onSubmit={handleCreateOrder}>
                            <div class="row">
                                <div class="col-lg-7 col-md-6"> 
                                    <div class="row">
                                        <div class="">
                                            <div class="checkout__input ">
                                                <h4 className="border__title">Giao hàng</h4>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="địa chỉ giao hàng" 
                                                    value={address} 
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <h4 className="border__title">Phương thức thanh toán</h4>

                                        <div className="custom-radios">
                                            <div>
                                                <input type="radio" id="color-3" name="paymentMethod" value="INPERSON" checked
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label for="color-3">
                                                    <span className="bgColor">
                                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                                    </span>
                                                    <span className="bgimg">
                                                        <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg" alt="Checked Icon" />
                                                    </span>
                                                    <span className="text">Tiền mặt</span>
                                                </label>
                                            </div>

                                            <div>
                                                <input type="radio" id="color-4" name="paymentMethod" value="MOMO"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label for="color-4">
                                                    <span className="bgColor">
                                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                                    </span>
                                                    <span className="bgimg">
                                                        <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png" alt="Checked Icon" />
                                                    </span>
                                                    <span className="text">MoMo</span>
                                                </label>
                                            </div>
                                        </div>


                                        {/* <Form.Select 
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option value="INPERSON">thanh toán khi nhận hàng</option>
                                            <option value="MOMO">thanh toán qua MoMo</option>
                                        </Form.Select> */}
                                       
                                    </div>

                                    
                                </div>

                                <div class="col-lg-5 col-md-6">
                                    <div class="checkout__order">
                                        {/* <div class="checkout__order__products">
                                            <p>Ghi chú đơn hàng<span>*</span></p>
                                            <textarea name="shipping_notes" class="shipping_notes"
                                                placeholder="Ghi chú đơn hàng của bạn (Không bắt buộc)" rows="10" cols="42"
                                                ></textarea>
                                        </div> */}
                                        <Button  size="block">
                                            Đặt hàng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                
        </Helmet>
    )
}

export default Checkout
