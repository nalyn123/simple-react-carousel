import React from 'react'
import styles from './CarouselArrow.module.scss'
import { CarouselArrowModel } from './CarouselArrowModel'
import classNames from 'classNames'

export const CarouselArrow = () => {
  const { onClick, isLeftActive, isRightActive } = CarouselArrowModel()

  return (
    <div className={styles.carousel__arrows}>
      <div
        className={classNames(
          styles.carousel__arrow,
          styles.carousel__arrow__left,
          !isLeftActive && styles.carousel__arrow__fade
        )}
        onClick={() => onClick(-1)}
      >
        <span className={styles.carousel__arrow__icon}></span>
      </div>
      <div
        className={classNames(
          styles.carousel__arrow,
          styles.carousel__arrow__right,
          !isRightActive && styles.carousel__arrow__fade
        )}
        onClick={() => onClick(1)}
      >
        <span className={styles.carousel__arrow__icon}></span>
      </div>
    </div>
  )
}
