// ! 21
import React, { useEffect } from 'react'
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice'
import useFetchCollection from '../../customHooks/useFetchCollection'
import SpinnerImg from "../../assets/spinner.jpg"

const Product = () => {

  const  { data, isLoading } = useFetchCollection("products"); // * use FetchCollectionHook to grab the components
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(
          STORE_PRODUCTS({
            products: data,
          })
        );
  }, [dispatch, data])

  return (
    <>
    <section>
          {/* PRODUCT FILTER */}
          <div className={`container ${styles.product}`}>
            <aside className={styles.filter}>
                {isLoading ? null : <ProductFilter />}
            </aside>

            {/* PRODUCT LIST */}
            <div className={styles.content}>
                {isLoading ? ( <img src={SpinnerImg} alt='Loading...' style={{width: "50px"}} className='--center-all' />) 
                : (
                  <ProductList products={products} />
                )}
            </div>
          </div>
          
    </section>
    </>
  )
}

export default Product