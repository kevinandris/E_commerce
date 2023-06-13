// ! 29
import React from 'react'
import styles from './Cart.module.scss'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice'
import { useSelector } from 'react-redux'
import {FaTrashAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
 
const Cart = () => {

  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  
  return (
      <section>
        <div className={`container ${styles.table}`}>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? ( 
            <>
              <p>Your cart is currently empty.</p>
              <br/>
              <div>
                <Link to="/#products">&larr; Continue shopping</Link>
              </div>
            </>
          ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name}  style={{width: "100px"}}/>
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className='--btn'>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className='--btn'>+</button>
                        </div>
                      </td>
                      <td>
                        {(price * cartQuantity.toFixed(2))}
                      </td>
                      <td className={styles.icons}>
                        <FaTrashAlt size={19} color="red"/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
                <button className='--btn --btn-danger'>Clear Cart</button>

                <div className={styles.checkout}>
                  <div>
                    <Link to="/#products">&larr; Continue shopping</Link>
                  </div>
                  <br/>

                  <Card cardClass={styles.card}>
                    <p>{`Cart item(s):  ${cartTotalQuantity}`}</p>
                    <div className={styles.text}>
                      <h4>SubTotal:</h4>
                      <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                    </div>
                    <p>Tax and shipping calculated at checkout</p>
                    <button className='--btn --btn-primary --btn-block'>Checkout</button>
                  </Card>
                </div>
            </div>
          </>
          )}
        </div>
      </section>
  )
}

export default Cart