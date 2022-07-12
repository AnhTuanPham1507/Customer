import React from "react";
import PizzaLeft from "../assets/images/contac.png";


function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${PizzaLeft})` }}
      ></div>
      <div className="rightSide">
        <h1> liên hệ </h1>

        <form id="form-contact" method="POST">
          <label htmlFor="name">nhập tên đầy đủ </label>
          <input name="name" placeholder="  ." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="nhập email..." type="email" />
          <label htmlFor="message">tin nhắn </label>
          <textarea
            rows="6"
            placeholder="nhập lời nhắn "
            name="message"
            required
          ></textarea>
          <button type="submit"> gửi tin nhắn </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
