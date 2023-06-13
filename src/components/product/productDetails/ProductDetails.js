// ! 25 - child
import styles from './ProductDetails.module.scss'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import spinnerImg from '../../../assets/spinner.jpg'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice'

const ProductDetails = () => {

  const { id } = useParams()
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cart = cartItems.find((cart) => cart.id === id)
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id
  })
  
  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const docRef = doc(db, "products", id); // * From FIREBASE docs - Add data once
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = { // * create an id to the object
        id: id,
        ...docSnap.data()
      }

      setProduct(obj)
    } else {
      toast.error("Product not found")
    }
  }

  // ! function 1
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }
  // ! function 
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }
  
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>

        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="loading..." width={{width: "50px"}}/>
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>

              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                  {/* LOGIC to remove the - quantity +  properties */}
                  {isCartAdded < 0 ? null : (
                    <>
                      <button className='--btn' onClick={() => decreaseCart(product)}>-</button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button className='--btn' onClick={() => addToCart(product)}>+</button>
                    </>
                  )}
                </div>

                <button className='--btn --btn-danger' onClick={() => addToCart(product)}>ADD TO CART</button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <p>{id}</p> */}
    </section>
  )
}

export default ProductDetails