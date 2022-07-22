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
import { faAngleRight,faCartXmark } from '@fortawesome/free-solid-svg-icons';
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

            {
            cartItems.length > 0  ?
                <>
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
                    </div>
                </>
            :
                <>
                    <div class="container text-center">
                        <div class="cart-empty">
                            <i className="cartnew-empty">
                                <p className="imgCartEmpty"></p>
                            </i>
                            
                            <h4>Không có sản phẩm nào trong giỏ hàng.</h4>
                            <h4>
                                <Link to="/">
                                    <Button className="btnHome">
                                        Về trang chủ
                                    </Button>
                                </Link>
                            </h4>                            
                        </div>
                    </div>

                    <div class="chat-wrapper">
                        <div class="container ">
                            <p>Khi cần trợ giúp vui lòng gọi <span>0917889558</span> hoặc <span>0943705326</span> (7h30 - 22h)</p>
                        </div>
                    </div>

                    <div class="container text-center">
                        <div class="container-shop">
                            <div class="container-img">
                            </div>
                            <div class="container-shop-text">
                                <h2>Sản phẩm mới</h2>
                                <p>Kiểm tra các sản phẩm mới nhất.</p>
                                <h4><a href="{{URL::to('/store')}}">Shop <i class="fas fa-angle-right"></i></a></h4>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Helmet>
        
    )
}

export default Cart
