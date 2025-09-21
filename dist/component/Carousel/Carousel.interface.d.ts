/// <reference types="react" />
export interface SlidesProps {
    [key: number]: number;
}
export interface CarouselProps {
    children: React.ReactNode;
    slides?: number | SlidesProps;
    hasArrow?: boolean;
    hasPaging?: boolean;
    gap?: number | string;
    spaceStart?: number | string;
}
