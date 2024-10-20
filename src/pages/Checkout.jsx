import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { auth, db } from "../firebase.config";
import { cartActions } from "../redux/slices/cartSlice";
import "../styles/checkout.css";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        userId: auth.currentUser.uid,
        date: new Date(),
        status: "ORDER_PLACED",
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        billingInfo: billingInfo,
        items: cartItems.map(item => ({
          id: item.id,
          productName: item.productName,
          image: item.image,
          quantity: item.quantity,
          price: parseFloat(item.price.toFixed(2)),
          totalPrice: parseFloat((item.price * item.quantity).toFixed(2))
        }))
      };

      await addDoc(collection(db, 'orders'), orderData);
      dispatch(cartActions.clearCart());
      navigate("/payment", { state: { totalAmount: totalAmount } });
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    placeOrder();
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing_form" onSubmit={handlePlaceOrder}>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter your name" name="name" value={billingInfo.name} onChange={handleInputChange} required />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="email" placeholder="Enter your email" name="email" value={billingInfo.email} onChange={handleInputChange} required />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="tel" placeholder="Phone number" name="phone" value={billingInfo.phone} onChange={handleInputChange} required />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="Street Address" name="address" value={billingInfo.address} onChange={handleInputChange} required />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="City" name="city" value={billingInfo.city} onChange={handleInputChange} required />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="Postal code" name="postalCode" value={billingInfo.postalCode} onChange={handleInputChange} required />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="Country" name="country" value={billingInfo.country} onChange={handleInputChange} required />
                </FormGroup>
                <div className="checkout_cart">
                  <h6>Total Qty: <span>{totalQty} items</span></h6>
                  <h6>Subtotal: <span>$ {totalAmount}</span></h6>
                  <h6>
                    <span>Shipping: <br />free shipping</span>
                    <span>$ 0</span>
                  </h6>
                  <h4>Total Cost: <span>$ {totalAmount}</span></h4>
                  <button type="submit" className="buy_btn auth_btn w-100">
                    Place an Order
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;