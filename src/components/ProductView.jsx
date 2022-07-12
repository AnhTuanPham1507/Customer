import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/product-modal/productModalSlice'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ProductView = props => {

    const dispatch = useDispatch()

    let {product} = props

    const [previewImg, setPreviewImg] = useState('')

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product ? product.product.image: '' )
        setQuantity(1)
    }, [product])


    const addToCart = () => {
        const action = addItem({...product,quantity})
        dispatch(action)
        alert('Thêm thành công')
    }

    const goToCart = () => {
        const action = addItem({...product,quantity})
        dispatch(action)
        dispatch(remove())
        props.history.push('/cart')
    }

    return (
        product ? 
        <section class="shop-details">
            <div class="product__details__pic">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__details__breadcrumb">
                                <Link to="/">Trang chủ</Link>
                                <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                <a href="{{url('/product-list/'.$cate_slug)}}">thit</a>
                                {/* <span>{{$meta_title}}</span> */}
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-7 col-md-7">
                        <img src={`${process.env.REACT_APP_IMAGEURL}${previewImg}`} alt="" />
                        </div>
                        <div class="col-lg-1 d-none d-lg-block"> </div>
                        <div class="col-lg-4 col-md-5">
                            <div class="product__details__text">
                                <h3>{product.product.name}</h3>
                                <div class="rating ">
                                    <div class="row d-flex ">
                                        {/* <ul class="list-inline">
                                            @for($count=1; $count<=5; $count++) @php if($count<=$rating){
                                                $color='color:#ffcc00;' ; } else { $color='color:#ccc;' ; } @endphp <li
                                                title="star_rating" data-product_id="{{$value->product_id}}"
                                                data-rating="{{$rating}}" class="rating"
                                                style="cursor:pointer; {{$color}} font-size:30px;">&#9733;</li>
                                                @endfor
                                        </ul> */}
                                    </div>
                                </div>
                                <h5>{numberWithCommas(product.soldPrice )}</h5>
                                <span>Danh mục:</span> fdg

                                <div className="product__info__item">
                                    <div className="product__info__item__quantity">
                                        <div className="product__info__item__title">
                                            Số lượng ({product.product.unit})
                                        </div>
                                        <div className="product__info__item__quantity">
                                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                                                <i className="bx bx-minus"></i>
                                            </div>
                                            <div className="product__info__item__quantity__input">
                                                {quantity}
                                            </div>
                                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                                                <i className="bx bx-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    
                                <div class="product__info__item"> 
                                    <Button  onClick={() => {addToCart()}}>thêm vào giỏ</Button>
                                </div>
                                <div class="product__info__item">
                                    <Button  onClick={() => {addToCart()}}>Yêu thích</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="product__details__content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__details__tab">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">Thông số kỹ
                                            thuật</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Đặc điểm nổi bật</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-7" role="tab">Đánh giá(5)</a>
                                    </li>

                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-5" role="tabpanel">
                                        <div class="product__details__tab__content">
                                            <p class="note">
                                            { ReactHtmlParser(product.product.description) }</p>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-6" role="tabpanel">
                                        <div class="product__details__tab__content">
                                            <p class="note"></p>
                                            <div class="product__details__tab__content__item">
                                                <p>dsfhj</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-7" role="tabpanel">
                                        <div class="product__details__tab__content">
                                            <form>
                                                
                                                <input type="hidden" name="comment_product_id" class="comment_product_id"
                                                    value="{{$value->product_id}}"/>
                                                <div id="comment_show"></div>

                                            </form>

                                            <div class="h-30 row d-flex justify-content-center">
                                                <div class="col-lg-8 centered">
                                                    <div class="blog__details__comment">
                                                        <h4>Thêm bình luận</h4>
                                                        
                                                        <h3>Đánh giá & nhận xét</h3>
                                                        {/* <ul class="list-inline rating" title="Average Rating">
                                                            @for($count=1; $count<=5; $count++) @php if($count<=$rating){
                                                                $color='color:#ffcc00;' ; } else { $color='color:#ccc;' ; }
                                                                @endphp <li title="star_rating"
                                                                id="{{$value->product_id}}-{{$count}}" data-index="{{$count}}"
                                                                data-product_id="{{$value->product_id}}"
                                                                data-rating="{{$rating}}" class="rating"
                                                                style="cursor:pointer; {{$color}} font-size:30px;">&#9733;</li>
                                                                @endfor
                                                        </ul> */}

                                                        <form action="#">
                                                            <div id="notify_comment"></div>
                                                            <div class="row">
                                                                <div class="col-lg-5 col-md-5">
                                                                    <input type="text" class="comment_name" placeholder="Name"/>
                                                                </div>
                                                                <div class="col-lg-12 text-center">
                                                                    <textarea class="comment_content"
                                                                        placeholder="Comment"></textarea>
                                                                    <button type="submit" class="site-btn send-comment">Gửi đánh
                                                                        giá</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        : 
        <div>loading</div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)
