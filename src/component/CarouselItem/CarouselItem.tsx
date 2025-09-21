import React from 'react'
import { CarouselItemProps } from './CarouselItem.interface'
import styles from './CarouselItem.module.scss'
import { CarouselItemModel } from './CarouselItemModel'
import classNames from 'classNames'

export const CarouselItem = ({
  children,
  className,
  onClick
}: CarouselItemProps) => {
  const { width } = CarouselItemModel()

  return (
    <div
      className={classNames(styles.carousel__item, className)}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
