// ! 18
import React, { useEffect, useState } from 'react'
import styles from './ViewProducts.module.scss'
import { toast } from 'react-toastify'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from '../../../firebase/config'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { STORE_PRODUCTS } from '../../../redux/slice/productSlice';

const ViewProducts = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    try {
      // * FROM FIREBASE
      const productsRef = collection(db, "products");

      // * order and limit data when fetching the stored data
      const q = query(productsRef, orderBy("createdAt", "desc"));

      // * Listen to multiple documents in a collection: monitor the document
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs)

        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        // console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          }));
      });
      
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  };

  // ! =============================== * //
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!', /* TITLE */
      'You are about to delete this product',
      'Delete',
      'Cancel',

      function okCb() {
        deleteProduct(id, imageURL)
        // alert('Product deleted');
      },

      function cancelCb() {
        console.log("Delete canceled")
        // alert('The product is not deleted');
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      },
    );
  }

  const deleteProduct = async (id, imageURL) => {

    // * FROM FIREBASE
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);

      await deleteObject(storageRef)
      toast.success("Product deleted successfully.");

    } catch (error) {
      toast.error(error.message)
    }
  };

  // ! ================================= ! //
  
  return (
    <>
      {/* shows loading gif */}
      {isLoading && <Loader/>}

      <div className={styles.table}>
        <h2>All Products</h2>

        {/* IF THERE IS NOTHING displays a message */}
        {products.length === 0 ? (
          <p>No product found.</p>
          ) : (
            <table>
                  <thead>
                      <tr>
                        <th>s/n</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                  </thead>

                  <tbody>
                    {products.map((product, index) => {
                      const {id, name, price, imageURL, category} = product;
                      return (
                        <tr key={id}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              <img src={imageURL} alt={name} style={{width: "100px"}}/>
                            </td>

                            <td>
                              {name}
                            </td>

                            <td>
                              {category}
                            </td>

                            <td>
                              {`$${price}`}
                            </td>

                            <td className={styles.icons}>
                              <Link to={`/admin/add-product/${id}`}>
                                  <FaEdit size={20} color='green'/>
                              </Link>
                                &nbsp; {/* space */}
                                <FaTrashAlt 
                                  size={18} 
                                  color='red' 
                                  onClick={() => confirmDelete(id, imageURL)}
                                />
                            </td>
                        </tr>
                      )
                    })}
                  </tbody>
            </table>
          )} 
      </div>
    </>
  )
}

export default ViewProducts