// ! 37
import useFetchCollection from '../../customHooks/useFetchCollection'
import styles from './OrderHistory.module.scss'
import React from 'react'

const OrderHistory = () => {

  const {data, isLoading } = useFetchCollection("orders")
  console.log(data);
  
  return (
    <div>Order History</div>
  )
}

export default OrderHistory