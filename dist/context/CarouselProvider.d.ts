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
interface SlidesProps {
    [key: number]: number;
}
interface CarouselProviderProps {
    children: React.ReactNode;
    totalSlides: number;
    slides?: number | SlidesProps;
    gap: number | string;
    spaceStart: number | string;
    loop: boolean;
}
export declare const useCarouselContext: () => CarouselContextProps;
export declare const CarouselProvider: ({ children, totalSlides, slides, gap, spaceStart, loop }: CarouselProviderProps) => React.JSX.Element;
export {};
