import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { auth, db } from '../firebase.config';
import { cartActions } from '../redux/slices/cartSlice';
import '../styles/payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [buttonText, setButtonText] = useState('Pay');
  const [buttonColor, setButtonColor] = useState('blue');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    setIsFlipped(document.activeElement === document.getElementById('cvv'));
  }, [cvv]);

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formatted = input.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted.slice(0, 19));
  };



  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 2) {
      setExpiryDate(input);
    } else {
      setExpiryDate(input.slice(0, 2) + '/' + input.slice(2, 4));
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setButtonText('Processing...');
    
    if (!auth.currentUser) {
      console.error('User not authenticated');
      setIsLoading(false);
      setButtonText('Pay');
      return;
    }

    try {
      const orderItems = cartItems.map(item => ({
        id: item.id,
        productName: item.productName,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.totalPrice
      }));

      const orderData = {
        userId: auth.currentUser.uid,
        items: orderItems,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        paymentMethod: 'Credit Card',
        status: 'ORDER_PLACED',
        date: new Date().toISOString(),
      };

      console.log('Order Data:', orderData);

      await addDoc(collection(db, 'orders'), orderData);
      
      setTimeout(() => {
        setButtonText('Success!');
        setButtonColor('green');
        dispatch(cartActions.clearCart());
        setTimeout(() => {
          navigate('/myOrders');
        }, 1000);
      }, 4000);

    } catch (error) {
      console.error('Error placing order: ', error);
      setIsLoading(false);
      setButtonText('Pay');
    }
  };

  return (
    <Helmet title='Payment'>
      <CommonSection title="Payment" />
      <section className="payment-section">
        <Container>
          <Row className="payment-row">
            <Col lg='6'>
              <div className="payment-form-container">
                <h2 className="payment-title">Payment Information</h2>
                <form onSubmit={handlePayment} className="payment-form">
                  <div className="form-group">
                    <label htmlFor="cardHolder">Card Holder</label>
                    <input 
                      type="text" 
                      id="cardHolder"
                      placeholder='JOHN DOE' 
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input 
                      type="text" 
                      id="cardNumber"
                      placeholder='1234 5678 9012 3456' 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      placeholder='MM/YY'
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder='123'
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                      maxLength="3"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="payment-button"
                    style={{
                      backgroundColor: buttonColor,
                      transition: 'background-color 0.3s ease'
                    }}
                    disabled={isLoading}
                  >
                    {buttonText} {isLoading ? '' : `$${totalAmount}`}
                  </button>
                </form>
              </div>
            </Col>
            <Col lg='6' className="credit-card-image-container">
              <div className={`credit-card-image ${isFlipped ? 'flipped' : ''}`}>
                <div className="credit-card-front">
                  <div className="credit-card-chip"></div>
                  <div className="credit-card-logo">VISA</div>
                  <div className="credit-card-number">{cardNumber || '**** **** **** ****'}</div>
                  <div className="credit-card-name">{cardHolder || 'CARD HOLDER NAME'}</div>
                  <div className="credit-card-expiry">{expiryDate || 'MM/YY'}</div>
                </div>
                <div className="credit-card-back">
                  <div className="credit-card-cvv">{cvv || '***'}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Payment;