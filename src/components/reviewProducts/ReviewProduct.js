// ! 41
import styles from './Reviewproducts.module.scss'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slice/productSlice'
import { selectUserID, selectUserName } from '../../redux/slice/authSlice'
import { useParams } from 'react-router-dom'
import Card from '../card/Card'
import StarsRating from 'react-star-rate'

const ReviewProduct = () => {

  const [rate, setRate] = useState(0)
  const [review, setReview] = useState("")
  const { id } = useParams()
  const products = useSelector(selectProducts)
  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)

  const product = products.find((item) => item.id === id)

  const submitReview = (e) => {
    e.preventDefault()

    console.log(rate, review);
  }

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        <p>
          <b>Product Name:</b> {product.name}
        </p>
        <img src={product.imageURL} alt={product.name} style={{width: "100px"}}/>

        <Card cardClass={styles.cardClass}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
              <StarsRating
                value={rate}
                onChange={rate => {
                  setRate(rate);
                }}
              />

              <label>Review:</label>
              <textarea value={review} required onChange={(e) => setReview(e.target.value)} cols="30" rows="10"></textarea>
              <button type='submit' className='--btn --btn-primary'>Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ReviewProduct