import React, { useContext, createContext, useState, useEffect } from 'react'

interface CarouselContextProps {
  activeSlide: number
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>
  totalSlides: number
  slides: number | string
  containerWidth: number
  setContainerWidth: Function
  contentWidth: number
  setContentWidth: Function
  gap: number | string
}

interface CarouselProviderProps {
  children: React.ReactNode
  totalSlides: number
  slides: number | string
  gap: number | string
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

export const useCarouselContext = () => {
  const context = useContext(CarouselContext)

  if (!context)
    throw Error('useCarouselContext must be used inside CarouselProvider')
  return context
}

export const CarouselProvider = ({
  children,
  totalSlides,
  slides,
  gap
}: CarouselProviderProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [contentWidth, setContentWidth2] = useState<number>(0)

  const setContentWidth = () => {
    const s = Number(slides)
    let newWidth = containerWidth / s
    setContentWidth2(newWidth)
  }

  useEffect(() => {
    setContentWidth()
  }, [containerWidth])

  return (
    <CarouselContext.Provider
      value={{
        activeSlide,
        setActiveSlide,
        totalSlides,
        slides,
        containerWidth,
        setContainerWidth,
        gap,
        contentWidth,
        setContentWidth
      }}
    >
      {children}
    </CarouselContext.Provider>
  )
}
