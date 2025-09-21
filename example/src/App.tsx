import React from 'react'

import { Carousel, CarouselItem } from 'simple-react-carousel'
import 'simple-react-carousel/dist/index.css'
import sampleImg from './img/sample.png'

const App = () => {
  const carouselProps = {
    slides: {
      0: 2,
      768: 5
    },
    gap: 15,
    spaceStart: 0.5
  }

  return (
    <Carousel {...carouselProps}>
      <CarouselItem onClick={() => alert('test')}>
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
