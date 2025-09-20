import React from 'react'

import { Carousel, CarouselItem } from 'simple-react-carousel'
import 'simple-react-carousel/dist/index.css'
import sampleImg from './img/sample.png'

const App = () => {
  const carouselProps = {
    slides: 2.5,
    hasArrow: true,
    hasPaging: true,
    gap: 15
  }

  return (
    <Carousel {...carouselProps}>
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
      <CarouselItem>
        <img src={sampleImg} alt='' />
      </CarouselItem>
    </Carousel>
  )
}

export default App
