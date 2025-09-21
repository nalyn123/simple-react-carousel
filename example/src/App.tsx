import React from 'react'

import { Carousel, CarouselItem } from 'simple-react-carousel'
import 'simple-react-carousel/dist/index.css'
import sampleImg from './img/sample.png'
import styles from './index.module.scss'

const App = () => {
  const carouselProps = {
    // slides: {
    //   0: 2,
    //   768: 1
    // },
    // slides: 1,
    // gap: 15
    slides: 1,
    hasArrow: false,
    gap: 0
    // loop: false
    // spaceStart: 0.5
  }

  return (
    <Carousel className={styles.test2} {...carouselProps}>
      <CarouselItem onClick={() => alert('test')} className={styles.test}>
        <img src={sampleImg} alt='' />
      </CarouselItem>
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
    </Carousel>
  )
}

export default App
