// ! 45 - child
import { useState } from 'react'
import styles from './ChangeOrderStatus.module.scss'
import React from 'react'
import Loader from '../../loader/Loader'
import Card from '../../card/Card'
import { Timestamp,  doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { db } from '../../../firebase/config'

const ChangeOrderStatus = ({order, id}) => {

    const [status, setStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // ! function
  const editOrder = (e, id) => {
    e.preventDefault()

    setIsLoading(true)
    
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate()
    }

    try {
      setDoc(doc(db, "orders", id),  orderConfig); // * from firebase docs (add data)
      toast.success("Order status changed successfully")
      setIsLoading(false)
      Navigate("/admin/orders")
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  } // close addProduct function
    
    return (
        <>
            {isLoading && <Loader/>}
            <div className={styles.status}>
                <Card cardClass={styles.card}>
                    <h4>Update Status</h4>
                    <form onSubmit={(e) => editOrder(e, id)}>
                        <span>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="" disabled>-- Select one --</option>
                                <option value="Order Placed...">Order Placed...</option>
                                <option value="Processing...">Processing...</option>
                                <option value="Shipped...">Shipped...</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </span>
                        <span>
                            <button type='submit' className='--btn --btn-primary'>Update Status</button>
                        </span>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default ChangeOrderStatus