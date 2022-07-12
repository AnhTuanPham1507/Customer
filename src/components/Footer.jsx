import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import logoFooter from '../assets/images/icon/logoSaleNoti.png'

import Grid from './Grid'

import logo from '../assets/images/Logo-2.png'
import { Row } from 'react-bootstrap';
const logo1 = "https://www.chili.vn/blogs/wp-content/uploads/2019/03/thiet-ke-web-ban-hang-1.png";
const footerAboutLinks = [

    {
        display: "Liên hệ",
        path: "/about"
    },
    {
        display: "Tuyển dụng",
        path: "/about"
    },
    {
        display: "Tin tức",
        path: "/about"
    },
    {
        display: "Hệ thống cửa hàng",
        path: "/about"
    }
]

const footerCustomerLinks = [
    {
        display: "Chính sách đổi trả",
        path: "/about"
    },
    {
        display: "Chính sách bảo hành",
        path: "/about"
    },
    {
        display: "Chính sách hoàn tiền",
        path: "/about"
    }
]
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                        <FontAwesomeIcon icon={faPhone} /> Tổng đài hỗ trợ (7:00 - 21:00)
                        </div>
                        <div className="footer__content">
                            <p>
                                Liên hệ đặt hàng: <strong>0917889558</strong>
                            </p>
                            <p>
                                Thắc mắc đơn hàng: <strong>0943705326</strong>
                            </p>
                            <p>
                                Góp ý, khiếu nại: <strong>0919644515</strong>
                            </p>
                        </div>
                        <div className="footer__border"></div>
                        <div className="footer__title">
                        <FontAwesomeIcon icon={faLocationDot} /> Liên hệ
                        </div>
                        <div className="footer__content">
                            <p>
                            Tầng 3-4 Hub Building <hr />
                            195/10E Điện Biên Phủ, P.15 , <hr />
                            Q.Bình Thạnh, TP.Hồ Chí Minh
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Giới thiệu
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Chăm sóc khách hàng
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo1} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng triệu người tiêu dùng Việt. Hãy cùng Yolo hướng đến một cuộc sống năng động, tích cực hơn.
                        </p>
                    </div>
                </Grid>
                <Row>
                    <div className="footer__buttom"></div>
                    <div className="col-7 col-lg-4 ">
                        <div className="footer__copyright__text">
                            
                            <p>Copyright ©
                                <script>
                                document.write(new Date().getFullYear());
                                </script>
                                Quốc Dương. All rights reserved.
                            </p>
                            
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block footer__img"></div>
                    <div className="col-5 col-lg-2">
                        <div className="footer__img">
                            <img src={logoFooter} className="img_logo_footer"/>
                        </div>
                    </div>
                </Row> 
            </div>
        </footer>
    )
}

export default Footer
