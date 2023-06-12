// ! 25 - child
import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.scss'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'


const ProductDetails = () => {

  const { id } = useParams()
  const [product, setProduct] = useState(null)
  
  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const docRef = doc(db, "products", id); // From FIREBASE docs - Add data once
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  
  return (
    <div>
      <h2>Product Details</h2>
      <p>{id}</p>
    </div>
  )
}

export default ProductDetails