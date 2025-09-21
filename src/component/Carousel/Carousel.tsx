import React, { useRef } from 'react'
import styles from './Carousel.module.scss'
import { CarouselProps } from './Carousel.interface'
import { CarouselArrow } from '../CarouselArrow/CarouselArrow'
import { CarouselPagination } from '../CarouselPagination/CarouselPagination'
import { CarouselProvider } from '@/context/CarouselProvider'
import { CarouselModel } from './CarouselModel'

export const Carousel = ({ children, ...props }: CarouselProps) => {
  const totalSlides = React.Children.toArray(children).length
  const { slides = 1, gap = 0, spaceStart = 0 } = props
  return (
    <CarouselProvider
      totalSlides={totalSlides}
      slides={slides}
      gap={gap}
      spaceStart={spaceStart}
    >
      <CarouselContent {...props}>{children}</CarouselContent>
    </CarouselProvider>
  )
}

const CarouselContent = ({ children, ...props }: CarouselProps) => {
  const ref = useRef(null)
  const { hasArrow = true, hasPaging = true, gap = 15 } = props
  const { scroll } = CarouselModel(ref)

  return (
    <div ref={ref} className={styles.carousel}>
      <div
        className={styles.carousel__content}
        style={{ transform: `translateX(${scroll}px)`, gap: `${gap}px` }}
      >
        {children}
      </div>

      {hasArrow && <CarouselArrow />}
      {hasPaging && <CarouselPagination />}
    </div>
  )
}
