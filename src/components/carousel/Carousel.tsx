export enum CarouselKind {
  STACK
}

interface CarouselProps<T> {
  kind?: CarouselKind;
  items: T[];
}

export const Carousel = <T,>({}: CarouselProps<T>) => {};
