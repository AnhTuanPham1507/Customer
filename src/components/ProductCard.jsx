import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {
    const {item} = props
    const dispatch = useDispatch()

    return (
        item ?
        <div className="product-card">
            <Link to={`/product/${item._id}`}>
                <div className="product-card__image">
                    <img src={`${process.env.REACT_APP_IMAGEURL}${item.product.image}`} alt="" />
                    {/* <img src={`${process.env.REACT_APP_IMAGEURL}${item.product.productImage}`} alt="" /> */}
                </div>
                <h3 className="product-card__name">{item.product.name}</h3>
                <div className="product-card__content__left">
                    <p className="product-card__content__left__text">{numberWithCommas(item.soldPrice)}</p> 
                </div>
            </Link>
            <div className="product-card__content__right">
                <div className="product-card__btn">
                    <Button
                        
                        icon="bx bx-cart"
                        animate={true}
                        onClick={() => dispatch(set(item))}
                        className="add"
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
        : <div>loading</div>
    )
}

ProductCard.propTypes = {
    item: PropTypes.object,
}

export default ProductCard
