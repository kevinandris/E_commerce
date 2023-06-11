// ! 17
import styles from "./AddProduct.module.scss"
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Loader from "../../loader/Loader"
import Card from "../../card/Card"
import { selectProducts } from '../../../redux/slice/productSlice'

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

  const { id } = useParams()  // * get params that is passed based on URL
  const products = useSelector(selectProducts) // * console.log(products)  ==> for testing on console ctrl-shift k
  const productEdit = products.find((item) => item.id === id)   // * To find the item id  --  console.log(productEdit) => for testing

  // * array for the product
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState}, productEdit)
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate() // * to navigate users to a specific page

  function detectForm(id, f1, f2) { // * to make certain elements dynamic
    if (id === "ADD") {
      return f1;
    }
    return f2 
  }

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

  const editProduct = (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      
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
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2> {/* dynamic */}

        <Card cardClass={styles.card}>

          <form onSubmit={detectForm(id, addProduct, editProduct)}>

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

                  <button className='--btn --btn-primary'>{detectForm(id, "Save Product", "Update Product")}</button> {/* dynamic */}
            </Card>

          </form>

        </Card>
      </div>
    </>
  )
}

export default AddProduct