import { useCarouselContext } from '@/context/CarouselProvider'
import { useEffect, useState } from 'react'

export const CarouselModel = (ref: any) => {
  const {
    activeSlide,
    gap,
    setContainerWidth,
    slides,
    contentWidth,
    totalSlides,
    spaceStart
  } = useCarouselContext()
  const [scroll, setScroll] = useState(0)

  const getTotal = () =>
    Math.ceil(
      totalSlides / Math.floor(Number(slides) - Math.ceil(Number(spaceStart)))
    )

  const computeContainerWidth = () => {
    if (ref.current) {
      const containerWidth = ref.current.offsetWidth
      setContainerWidth(containerWidth)
    }
  }

  const setContentWidth = () => {
    const conWidth = contentWidth + Number(gap)
    const width =
      Math.floor(Number(slides) - Math.ceil(Number(spaceStart))) * conWidth
    let newScroll = activeSlide * width - Number(spaceStart) * conWidth

    // TODO: fix
    const isLastSlide = activeSlide === getTotal() - 1
    const isPartialSlide = Number(slides) % 1 !== 0

    if (isLastSlide && activeSlide !== 0) {
      if (isPartialSlide) {
        const fraction = Number(slides) - Math.floor(Number(slides))
        newScroll -= contentWidth * fraction - Number(gap)
      } else if (spaceStart) {
        newScroll -= contentWidth * Number(spaceStart || 1) + Number(gap) / 2
      }
    }

    setScroll(newScroll * -1)
  }

  useEffect(() => {
    computeContainerWidth()
  }, [ref])

  useEffect(() => {
    setContentWidth()
  }, [contentWidth, activeSlide])

  useEffect(() => {
    window.addEventListener('resize', computeContainerWidth)

    return () => window.removeEventListener('resize', computeContainerWidth)
  }, [])

  return { scroll }
}
