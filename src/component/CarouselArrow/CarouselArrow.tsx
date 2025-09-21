import React from 'react'
import './CarouselArrow.scss'
import { CarouselArrowModel } from './CarouselArrowModel'
// import classNames from 'classNames'

export const CarouselArrow = () => {
  const { onClick, isLeftActive, isRightActive } = CarouselArrowModel()

  return (
    <div className='carousel__arrows'>
      <div
        className={`carousel__arrow carousel__arrow__left ${
          !isLeftActive ? 'carousel__arrow__disabled' : ''
        }`}
        onClick={() => onClick(-1)}
      >
        <span className='carousel__arrow__icon'></span>
      </div>
      <div
        className={`carousel__arrow carousel__arrow__right
          ${!isRightActive ? 'carousel__arrow__disabled' : ''}
        `}
        onClick={() => onClick(1)}
      >
        <span className='carousel__arrow__icon'></span>
      </div>
    </div>
  )
}
