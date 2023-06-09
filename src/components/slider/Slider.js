// ! 14 -- child
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { sliderData } from './Slider-data'
import './Slider.scss'

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    // console.log(slideLength)

    // auto scroll variables
    const autoScroll = true
    let slideInterval;
    let intervalTime = 5000

    // function for right arrow
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1); /* move onto the next slide */
    };

    // function for left arrow
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1); /* move onto the next slide */
    };

    // useEffect for auto scroll
    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    // make the images moves automatically (interval Time added here as well)
    // const auto = () => {
    //     slideInterval = setInterval(nextSlide, intervalTime)
    // }

    useEffect(() => {
        if (autoScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime)
            };
            
            auto();
        }

        // clean up
        return () => clearInterval(slideInterval)

    }, [currentSlide, slideInterval, autoScroll])
    // ==================================================================== //
    
    return (

        <div className='slider'>
        
            <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>

            { sliderData.map((slide, index) => {

                const {image, heading, desc} = slide
                
                return (
                    <div  key={index} className={index === 
                    currentSlide ? "slide current" : "slide"}>

                        {index === currentSlide && (
                            <>
                                {/* display image */}
                                <img src={image} alt="slide" />

                                <div className="content">
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <hr />
                                    <a href="#product" className='--btn --btn-primary'>
                                        Shop now
                                    </a>
                                </div>
                            </>
                        )}
                        
                    </div>
                )
            })}

        </div>
  )
}

export default Slider