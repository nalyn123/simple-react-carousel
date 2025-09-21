import { useCarouselContext } from '@/context/CarouselProvider'
import { useEffect, useState } from 'react'

export const CarouselArrowModel = () => {
  const { activeSlide, slides, totalSlides, setActiveSlide, spaceStart } =
    useCarouselContext()
  const [isLeftActive, setLeftActive] = useState(true)
  const [isRightActive, setRightActive] = useState(true)

  const onClick = (click: number) => {
    setSlide(click)
  }

  const getTotal = () =>
    Math.ceil(
      totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart)))
    )

  const setSlide = (click: number = 0) => {
    // TODO: slide to left animation
    const newSlide = activeSlide + click
    const last = getTotal()

    if (newSlide <= -1 || newSlide >= last) return

    setActiveSlide(newSlide)
  }

  useEffect(() => {
    setLeftActive(activeSlide > 0)
    setRightActive(activeSlide < getTotal() - 1)
  }, [activeSlide])

  return {
    onClick,
    isLeftActive,
    isRightActive
  }
}
