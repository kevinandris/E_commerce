// ! 30
import  { useState } from 'react'
import styles from "./CheckoutDetails.module.scss"
import Card from '../../components/card/Card'
import { CountryDropdown } from 'react-country-region-selector'

const initialAddressState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
}


const CheckoutDetails = () => {
    
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
    const [billingAddress, setBillingAddress] = useState({...initialAddressState})
    
    const handleShipping = () => {}
    const handleBilling = () => {}
    const handleSubmit = () => {};

    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout Details</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        {/* FOR SHIPPING ADDRESS */}
                        <Card cardClass={styles.card}>
                            <h3>Shipping Address</h3>
                            <label>Recipient Name:</label>
                            <input 
                                type="text" 
                                placeholder='Recipient Name'
                                required
                                name='name'
                                value={shippingAddress.name}
                                onChange={(e) => handleShipping(e)}
                            />

                            <label>Address line 1:</label>
                            <input 
                                type="text" 
                                placeholder='Address line 1'
                                required
                                name='line1'
                                value={shippingAddress.line1}
                                onChange={(e) => handleShipping(e)}
                            />

                            <label>Address line 2:</label>
                            <input 
                                type="text" 
                                placeholder='Address line 2'
                                name='line2'
                                value={shippingAddress.line2}
                                onChange={(e) => handleShipping(e)}
                            />

                            <label>City:</label>
                            <input 
                                type="text" 
                                placeholder='City'
                                required
                                name='city'
                                value={shippingAddress.city}
                                onChange={(e) => handleShipping(e)}
                            />

                            <label>State:</label>
                            <input 
                                type="text" 
                                placeholder='State'
                                required
                                name='state'
                                value={shippingAddress.state}
                                onChange={(e) => handleShipping(e)}
                            />

                            <label>Postal Code:</label>
                            <input 
                                type="text" 
                                placeholder='Postal Code'
                                required
                                name='postal_code'
                                value={shippingAddress.postal_code}
                                onChange={(e) => handleShipping(e)}
                            />

                            {/* COUNTRY MISSING */}
                            <CountryDropdown 
                                valueType='short'
                                className={styles.select}
                                value={shippingAddress.country}
                                onChange={(val) => handleShipping({
                                    target: {
                                        name: "country",
                                        value: val,
                                    },
                                } )}

                            />

                            <label>Phone:</label>
                            <input 
                                type="text" 
                                placeholder='Phone'
                                required
                                name='phone'
                                value={shippingAddress.phone}
                                onChange={(e) => handleShipping(e)}
                            />
                        </Card>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CheckoutDetails