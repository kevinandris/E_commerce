import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import Product from '../../components/product/Product'

const Home = () => {

  const url = window.location.href;

  useEffect(() => {

     // ! function 1
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior:"smooth"
        })

        return // only occurs once
      }
    };
    scrollToProducts()
  }, [url])

  return (
    <>
      <div>
        <Slider />
        <Product />
      </div>
    </>
  )
}

export default Home