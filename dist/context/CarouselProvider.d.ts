import React from 'react';
interface CarouselContextProps {
    activeSlide: number;
    setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
    totalSlides: number;
    slides: number | string;
    containerWidth: number;
    setContainerWidth: Function;
    contentWidth: number;
    setContentWidth: Function;
    gap: number | string;
    spaceStart: number | string;
}
interface CarouselProviderProps {
    children: React.ReactNode;
    totalSlides: number;
    slides: number | string;
    gap: number | string;
    spaceStart: number | string;
}
export declare const useCarouselContext: () => CarouselContextProps;
export declare const CarouselProvider: ({ children, totalSlides, slides, gap, spaceStart }: CarouselProviderProps) => React.JSX.Element;
export {};
