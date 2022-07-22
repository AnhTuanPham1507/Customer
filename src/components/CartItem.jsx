import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateItem, removeItem } from '../redux/shopping-cart/cartItemsSlide'

import numberWithCommas from '../utils/numberWithCommas'
import { Link } from 'react-router-dom'

const CartItem = props => {

    const dispatch = useDispatch()

    const {item} = props

    const [totalProductPrice, setTotalProductPrice] = useState(0)

    const updateQuantity = (opt) => {
        if (opt === '+') {
            dispatch(updateItem({...item, quantity: item.quantity + 1}))
        }
        if (opt === '-') {
            dispatch(updateItem({...item, quantity: item.quantity - 1}))
        }
    }

    useEffect(() => {
        setTotalProductPrice(item.soldPrice* item.quantity)
    }, [item])

    // const updateCartItem = () => {
    //     dispatch(updateItem({...item, quantity: quantity}))
    // }

    const removeCartItem = () => {
        console.log('removeCartItem')
        dispatch(removeItem(item))
    }

    return (
        item ? 
            
            <tbody>
                <tr>
                    <td className="product__cart__item">
                        <Link to={`/product/${item._id}`}>
                            <div className="product__cart__item__pic">
                                <img className="imgCart" src={`${process.env.REACT_APP_IMAGEURL}${item.product.image}`} alt="" />
                            </div>
                            <div className="product__cart__item__text">
                                <h5>{item.product.name}</h5>
                                <h6>{numberWithCommas(item.soldPrice)}</h6>
                            </div>
                        </Link>
                    </td>
                    
                    <td className="quantity__item">
                        <div className="cart__item__info__quantity">
                            <div className="product__info__item__quantity">
                                <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('-')}>
                                    <i className="bx bx-minus"></i>
                                </div>
                                <div className="product__info__item__quantity__input">
                                    {item.quantity}
                                </div>
                                <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('+')}>
                                    <i className="bx bx-plus"></i>
                                </div>
                            </div>
                        </div>
                    </td>
                    
                    <td className="cart__price">
                    {numberWithCommas(totalProductPrice)}</td>
                    <td className="cart__close">
                        <i className='bx bx-trash' onClick={() => removeCartItem()}></i>
                    </td>
                </tr>
            </tbody>
                   
                
 

        : <div>loding</div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem
