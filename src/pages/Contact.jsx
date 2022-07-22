import React from "react";
import { Form, Button } from "react-bootstrap";

function Contactus() {

    const handleSubmit = (event) => {
        event.preventDefault()
    }

  return (
    <div className="contact">

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Fullname</Form.Label>
          <Form.Control type="text" placeholder="Fullname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Subject" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Message</Form.Label>
          <Form.Control type="text-area" placeholder="Message" />
        </Form.Group>
        <Button variant="primary" className="mb-3" type="submit">
          Send
        </Button>
      </Form>

    </div>
  );
}

export default Contactus;