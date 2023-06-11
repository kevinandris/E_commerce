// ! 20
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';

const useFetchCollection = ({collectionName}) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getCollection = () => {
        setIsLoading(true)
    
        try {
          // * FROM FIREBASE
          const docRef = collection(db, collectionName);
    
          // * order and limit data when fetching the stored data
          const q = query(productsRef, orderBy("createdAt", "desc"));
    
          // * Listen to multiple documents in a collection: monitor the document
          onSnapshot(q, (snapshot) => {
            // console.log(snapshot.docs)
    
            const allData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
            // console.log(allData);
            setData(allData);
            setIsLoading(false);
          });
          
        } catch (error) {
          setIsLoading(false)
          toast.error(error.message)
        }
    }; // close getProducts function

    useEffect(() => {
        getCollection()
    }, [])

    return {data, isLoading}
}

export default useFetchCollection