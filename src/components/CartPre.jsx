import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { updateItem, removeItem } from '../redux/shopping-cart/cartItemsSlide'

import numberWithCommas from '../utils/numberWithCommas'
import { Link } from 'react-router-dom'

const CartPre = props => {

    const dispatch = useDispatch()

    const {item} = props

    return (
        item ? 
        <div className="cartpre__item" >
            <div className="cartpre__item__image">
                <img src={`${process.env.REACT_APP_IMAGEURL}${item.product.image}`} alt="" />
            </div>
            <div className="cartpre__item__info">
                <div className="cartpre__item__info__name">
                    <Link to={`/product/${item._id}`}>
                        {`${item.product.name} - ${item.quantity} ${item.product.unit}`}
                    </Link>
                </div>
               
                <div className="cartpre__item__info__quantity">
                    <div className="product__info__item__quantity">                     
                        x{item.quantity}                
                    </div>
                </div>
               
            </div>
        </div>
        : <div>loding</div>
    )
}

CartPre.propTypes = {
    item: PropTypes.object
}

export default CartPre
