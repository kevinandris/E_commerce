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
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';

const ViewProducts = () => {

  const  { data, isLoading } = useFetchCollection("products"); // * use FetchCollectionHook to grab the components
  const products = useSelector(selectProducts)

  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(
          STORE_PRODUCTS({
            products: data,
          })
        );
  }, [dispatch, data])

  // ! function 1
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
  } // close confirmDelete function

  // ! function 2
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
  }; // close deleteProduct function

  // * === END OF FUNCTIONS IMPLEMENTATION === //
  
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
                        <th>Image</th>
                        <th>Name</th>
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