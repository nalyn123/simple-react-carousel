import { useCarouselContext } from '@/context/CarouselProvider'
import { useEffect, useState } from 'react'

export const CarouselModel = (ref: any) => {
  const {
    activeSlide,
    gap,
    setContainerWidth,
    slides,
    contentWidth,
    totalSlides
  } = useCarouselContext()
  const [scroll, setScroll] = useState(0)

  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides)))

  const setContentWidth = () => {
    if (ref.current) {
      const containerWidth = ref.current.offsetWidth
      const width = Math.floor(Number(slides)) * (contentWidth + Number(gap))
      let newScroll = activeSlide * width

      if (
        slides !== Math.floor(Number(slides)) &&
        activeSlide === getTotal() - 1
      ) {
        const percentage = Number(slides) - Math.floor(Number(slides))
        newScroll -= contentWidth * percentage - Number(gap)
      }

      setScroll(newScroll * -1)
      setContainerWidth(containerWidth)
    }
  }

  useEffect(() => {
    setContentWidth()
  }, [ref, activeSlide])

  useEffect(() => {
    window.addEventListener('resize', setContentWidth)

    return () => window.removeEventListener('resize', setContentWidth)
  }, [])

  return { scroll }
}
