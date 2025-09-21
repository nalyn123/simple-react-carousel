/// <reference types="react" />
export interface CarouselItemProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
