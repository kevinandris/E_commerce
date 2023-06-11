import React from 'react'
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'

const Product = () => {
  return (
    <>
    <section>
          {/* PRODUCT FILTER */}
          <div className={`container ${styles.product}`}>
            <aside className={styles.filter}>
                <ProductFilter />
            </aside>

            {/* PRODUCT LIST */}
            <div className={styles.content}>
                <ProductList />
            </div>
          </div>
          
    </section>
    </>
  )
}

export default Product