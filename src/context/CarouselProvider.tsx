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
  spaceStart: number | string
}

interface SlidesProps {
  [key: number]: number
}

interface CarouselProviderProps {
  children: React.ReactNode
  totalSlides: number
  slides?: number | SlidesProps
  gap: number | string
  spaceStart: number | string
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
  gap,
  spaceStart
}: CarouselProviderProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [contentWidth, setContentWidth2] = useState<number>(0)
  const [newSlides, setNewSlides] = useState<number>(spaceStart ? 2 : 1)

  const setContentWidth = () => {
    const s = Number(newSlides)
    let newWidth = containerWidth / s
    setContentWidth2(newWidth)
  }

  const computeSlides = () => {
    if (typeof slides === 'object') {
      const currSlides = Object.keys(slides).filter((value) => {
        return Number(value) <= window.innerWidth
      })
      const key = Number(currSlides?.[currSlides.length - 1])
      setNewSlides(slides?.[key || 0])
    } else {
      setNewSlides(Number(slides))
    }
  }

  useEffect(() => {
    computeSlides()
    window.addEventListener('resize', computeSlides)

    return () => window.removeEventListener('resize', computeSlides)
  }, [slides])

  useEffect(() => {
    setContentWidth()
  }, [containerWidth, newSlides])

  return (
    <CarouselContext.Provider
      value={{
        activeSlide,
        setActiveSlide,
        totalSlides,
        slides: newSlides,
        containerWidth,
        setContainerWidth,
        gap,
        contentWidth,
        setContentWidth,
        spaceStart
      }}
    >
      {children}
    </CarouselContext.Provider>
  )
}
