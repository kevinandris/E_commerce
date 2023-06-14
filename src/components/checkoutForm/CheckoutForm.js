// ! 35
import styles from './Checkout.module.scss'
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Card from '../card/Card';
import CheckoutSummary from '../checkoutSummary/CheckoutSummary';
import SpinnerImg from "../../assets/spinner.jpg"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID)
  const userEmail = useSelector(selectEmail)
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const shippingAddress = useSelector(selectShippingAddress)

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  }, [stripe]);

  // ! function
  const saveOrder = () => {
    const today = new Date()
    const date = today.toDateString()
    const time = today.toLocaleTimeString()
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Place...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate()
    }

    try {
      addDoc(collection(db, "orders"),   // * from firebase docs (add data)
        orderConfig
      );
      dispatch(CLEAR_CART())
      toast.success("Order Saved")
      navigate("/checkout-success")
    } catch (error) {
      toast.error(error.message)
    }
  } // close addProduct function
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const  confirmPayment =  await stripe
    .confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout-success", // Make sure to change this to your payment completion page
      },
      redirect: "if_required" // FROM stripe
    })
    .then((result) => {
      if (result.error) { //  ok - paymentIntent // bad - error
        toast.error(result.error.message)
        setMessage(result.error.message)
        return;
      }

      if (result.paymentIntent) {
        if (result.paymentIntent.status === "succeeded") {
          setIsLoading(false)
          toast.success("Payment successful")
          saveOrder()
        }
      }
    });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
    <section>
        <div className={`container ${styles.checkout}`}>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>

            <div>
              <Card cardClass={styles.card}>
                <CheckoutSummary/>
              </Card>
            </div>

            <div>
              <Card cardClass={`${styles.card} ${styles.pay}`}>
                <h3>Stripe checkout</h3>
                <PaymentElement id={styles["payment-element"]}  />

                <button 
                  disabled={isLoading || !stripe || !elements} 
                  id="submit" className={styles.button}>
                  <span id="button-text">
                    {isLoading ? (<img src={SpinnerImg} alt="Loading..." style={{width: "20px"}}/>) : "Pay now"}
                  </span>
                </button>

                {/* Show any error or success messages */}
                {message && 
                <div id={styles["payment-message"]}>
                  {message}
                </div>}
              </Card>
            </div>

          </form>
        </div>
    </section>
    </>
  );
}

              

export default CheckoutForm;