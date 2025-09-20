import { useCarouselContext } from '@/context/CarouselProvider'

export const CarouselItemModel = () => {
  const { contentWidth } = useCarouselContext()

  return { width: contentWidth }
}
