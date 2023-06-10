import { useEffect, useState } from 'react'
import styles from './ViewProducts.module.scss'
import { toast } from 'react-toastify'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase/config'

const ViewProducts = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    try {
      // * FROM FIREBASE
      const productsRef = collection(db, "cities");

      // * order and limit data when fetching the stored data
      const q = query(productsRef, orderBy("createdAt", "desc"));

      // * Listen to multiple documents in a collection: monitor the document
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs)

        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(allProducts)
        setProducts(allProducts)
      });
      
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  };
  
  return (
    <div>View Products</div>
  )
}

export default ViewProducts