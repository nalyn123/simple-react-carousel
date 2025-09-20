import React from 'react'
import styles from './CarouselPagination.module.scss'
import { CarouselPaginationProps } from './CarouselPagination.interface'
import { CarouselPaginationModel } from './CarouselPaginationModel'
import classNames from 'classNames'

export const CarouselPagination = (_: CarouselPaginationProps) => {
  const { total, active, onClick } = CarouselPaginationModel()

  return (
    <div className={styles.carousel__page}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={classNames(
            styles.carousel__page__item,
            active === i && styles.carousel__page__item__active
          )}
          onClick={() => onClick(i)}
        ></div>
      ))}
    </div>
  )
}
