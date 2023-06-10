import { useState } from 'react'
import styles from "./AddProduct.module.scss"
import Card from "../../card/Card"

const categories = [
  { id: 1, name: "Laptop"},
  { id: 2, name: "Electronics"},
  { id: 3, name: "Fashion"},
  { id: 4, name: "Laptop"},
]

const AddProducts = () => {

  // array for the product
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: null,
    category: "",
    brand: "",
    desc: "",
  })

  const handleInputChange = (e) => {};
  const handleImageChange = (e) => {};
  
  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>

        <form >
          <label >Product name: </label>
          <input 
            type="text"  
            placeholder='Product name' 
            required
            name='name'
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label >Product image: </label>
          <Card cardClass={styles.group}>
              <div className={styles.progress}>
                <div 
                    className={styles["progress-bar"]} 
                    style={{width: "50%"}}>
                      Uploading 50%
                </div>
              </div>

              <input 
                type="file" 
                accept='image/*' 
                placeholder='Product Image'
                name='image'
                onChange={(e) => handleImageChange(e)}    
              />

              <input 
                  type="text" 
                  required
                  name='imageURL'                    
                  value={product.imageURL}
                  disabled
              />

            <label >Product price: </label>
            <input 
              type="number"  
              placeholder='Product price' 
              required
              name='price'
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            <label >Product Category: </label>
            <select 
                required 
                name="category"
                value={product.category}
                onChange={(e) => handleImageChange(e)}>
                  <option
                      value=""
                      disabled> 
                      -- choose product category --
                  </option>
                  
                  {/* if you wanna map an array you need a key and value */}
                  {categories.map((cat) => {
                    return (
                      <option key={cat.id}  value={cat.name}>
                          {cat.name}
                      </option>
                    )
                  })}
              </select>

              <label >Product Company/Brand: </label>
              <input 
                type="text"  
                placeholder='Product brand' 
                required
                name='brand'
                value={product.brand}
                onChange={(e) => handleInputChange(e)}
              />

              <label >Product Description</label>
              <textarea 
                  name="desc"
                  cols="30" 
                  rows="10"
                  value={product.desc}
                  required
                  onChange={(e) => handleInputChange(e)}>
                </textarea>

                <button className='--btn --btn-primary'>Save product</button>

          </Card>

        </form>

      </Card>
    </div>
  )
}

export default AddProducts