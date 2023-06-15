// ! 41
import styles from './Reviewproducts.module.scss'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slice/productSlice'
import { selectUserID, selectUserName } from '../../redux/slice/authSlice'
import { useParams } from 'react-router-dom'
import Card from '../card/Card'
import StarsRating from 'react-star-rate'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import useFetchDocument from '../../customHooks/useFetchDocument'
import spinnerImg from '../../assets/spinner.jpg'

const ReviewProduct = () => {

  const [rate, setRate] = useState(0)
  const [review, setReview] = useState("")
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const { document } = useFetchDocument("products", id)
  const products = useSelector(selectProducts)
  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)

  useEffect(() => {
    setProduct(document)
  }, [document])


  const submitReview = (e) => {
    e.preventDefault()

    // ! function to send the data to our firebase database
    const today = new Date()
    const date = today.toDateString()
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate()
    }

    try {
      addDoc(collection(db, "reviews"), reviewConfig)  // * from firebase docs (add data)
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>

        {product === null ? (
          <img src={spinnerImg} alt="Loading..."  width={{width: "50px"}}/>
        ) : (
          <>
            <p>
              <b>Product Name:</b> {product.name}
            </p>
            <img src={product.imageURL} alt={product.name} style={{width: "150px"}}/>
          </>
        )}

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