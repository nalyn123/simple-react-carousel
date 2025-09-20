import React from 'react'
import { CarouselItemProps } from './CarouselItem.interface'
import styles from './CarouselItem.module.scss'
import { CarouselItemModel } from './CarouselItemModel'

export const CarouselItem = ({ children }: CarouselItemProps) => {
  const { width } = CarouselItemModel()
  return (
    <div
      className={styles.carousel__item}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
    >
      {children}
    </div>
  )
}
