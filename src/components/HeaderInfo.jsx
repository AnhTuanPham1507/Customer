import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser,faBox,faGear,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import cart from '../assets/images/icon/cart.png';
import heart from '../assets/images/icon/heart.png';


import { useSelector } from 'react-redux';

HeaderUserInfo.propTypes = {
    onLogout: PropTypes.func,
};

function HeaderUserInfo(props) {
    const { onLogout, cartItems, token } = props

    function handleLogout() {
        if (onLogout) {
            onLogout()
        }
    }

    return (
        <Dropdown.Menu>
            {
                !token
                    ?
                    <>
                        
                            {
                            cartItems.length!==0?
                             <>
                                <Dropdown.Item className="cartDetails-top" href="/cart">
                                    Có {cartItems.length} sản phẩm trong giỏ. 
                                </Dropdown.Item>
                            </>
                            :
                            <>
                                <div className="cartDetails">Giỏ hàng trống.</div>
                            </>
                            } 
                       
                        <Dropdown.Item href="/cart">
                            <img src={cart} alt="" /> Giỏ hàng {
                                cartItems.length!==0 ? <>({cartItems.length})</> 
                                :<></>}
                        </Dropdown.Item>
                        <Dropdown.Item href="/cart">
                            <img src={heart} alt="" /> Yêu thích
                        </Dropdown.Item>
                        <Dropdown.Item href="/login">
                            <FontAwesomeIcon className="userCircle" icon={faCircleUser} /> Đăng nhập
                        </Dropdown.Item>
                    </>
                    
                    :

                    <>
                        {
                            cartItems.length!==0?
                             <>
                                <Dropdown.Item className="cartDetails-top" href="/cart">
                                    Có {cartItems.length} sản phẩm trong giỏ. 
                                </Dropdown.Item>
                            </>
                            :
                            <>
                                <div className="cartDetails">Giỏ hàng trống.</div>
                            </>
                        } 
                        <Dropdown.Item href="/user-info">
                            <FontAwesomeIcon className="userCircle" icon={faGear}/> Xem thông tin
                        </Dropdown.Item>
                        <Dropdown.Item href="/order">
                            <FontAwesomeIcon className="userCircle" icon={faBox}/> Xem đơn hàng
                        </Dropdown.Item>
                        <Dropdown.Item href="/cart">
                            <img src={cart} alt="" /> Giỏ hàng {
                                cartItems.length!==0 ? <>({cartItems.length})</> 
                                :<></>} 
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            <FontAwesomeIcon className="userCircle" icon={faArrowRightFromBracket} /> Đăng xuất
                        </Dropdown.Item>
                    </>
            }
        </Dropdown.Menu>

    );
}

export default HeaderUserInfo;