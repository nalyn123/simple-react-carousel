import { useCarouselContext } from '@/context/CarouselProvider'

export const CarouselPaginationModel = () => {
  const { activeSlide, slides, totalSlides, setActiveSlide } =
    useCarouselContext()

  const getTotal = () => Math.ceil(totalSlides / Math.floor(Number(slides)))

  const onClick = (click: number) => {
    setActiveSlide(click)
  }

  return {
    total: getTotal(),
    active: activeSlide,
    onClick
  }
}
