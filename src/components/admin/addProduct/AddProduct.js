// ! 17
import { useState } from 'react'
import styles from "./AddProduct.module.scss"
import Card from "../../card/Card"
import { db, storage } from '../../../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Loader from "../../loader/Loader"

const categories = [
  { id: 1, name: "Laptop"},
  { id: 2, name: "Electronics"},
  { id: 3, name: "Fashion"},
  { id: 4, name: "Phone"},
]

const initialState = {
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",  
}

const AddProduct = () => {

  // array for the product
  const [product, setProduct] = useState({
    ...initialState
  })

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {name, value}  = e.target
    setProduct({...product, [name]: value})
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // console.log(file);

    // from firebase docs website 
    const storageRef = ref(storage, `eshop/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress)
    }, 
    (error) => {
      toast.error(error.message)
    }, 
    () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => {
            setProduct({...product, imageURL: downloadURL})

            // message for successful upload
            toast.success("Image uploaded successfully.")
          });
        }
    );
  };

  const addProduct = (e) => {
    e.preventDefault()
    // console.log(product)

    setIsLoading(true)

    try {
      const docRef = addDoc(collection(db, "products"), {   // from firebase docs (add data)
        name: product.name,
        imageURL: product.imageURL,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc, 
        createdAt: Timestamp.now().toDate()
      });

      setIsLoading(false)
      setUploadProgress(0)
      setProduct({ ...initialState })

      toast.success("Product uploaded successfully.")

      navigate("/admin/all-products")

    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  } 

  // * ========================================== * //

  return (
    <>
      {isLoading && <Loader />}
    
      <div className={styles.product}>
        <h1>Add New Product</h1>
        <Card cardClass={styles.card}>

          <form onSubmit={addProduct}>

            <label >Product Name: </label>
            <input 
              type="text"  
              placeholder='Product name' 
              required
              name='name'
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label >Product Image: </label>
            <Card cardClass={styles.group}>

                {/* condition for progress bar */}
                {uploadProgress === 0 ? null : (
                  <div className={styles.progress}>
                    <div 
                        className={styles["progress-bar"]} 
                        style={{width: `${uploadProgress}%`}}>
                          {uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload Completed ${uploadProgress}%`}
                    </div>
                  </div>
                )}

                <input 
                  type="file" 
                  accept='image/*' 
                  placeholder='Product Image'
                  name='image'
                  onChange={(e) => handleImageChange(e)}    
                />

                {product.imageURL === "" ? null : (
                  <input 
                      type="text" 
                      // required
                      placeholder='Image URL'
                      name='imageURL'                    
                      value={product.imageURL}
                      disabled
                  />
                )}

                <label >Product Price: </label>
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
                    onChange={(e) => handleInputChange(e)}>
                      <option
                          value=""
                          disabled> 
                          -- choose product category --
                      </option>
                      
                      {/* if you wanna map an array you need a key and a value */}
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
    </>
  )
}

export default AddProduct