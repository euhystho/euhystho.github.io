// Taken from https://www.embla-carousel.com/examples/predefined/#parallax
import { type EmblaCarouselType, type EmblaEventType } from "embla-carousel";

const _FACTOR_BASE = 0.2;
let Factor = 0;
let Nodes: HTMLElement[] = [];

const setNodes = (emblaApi: EmblaCarouselType): void => {
  Nodes = emblaApi.slideNodes().map((slideNode) => {
    return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
  });
};

const setFactor = (emblaApi: EmblaCarouselType): void => {
  Factor = _FACTOR_BASE * emblaApi.scrollSnapList().length;
};

const Parallax = (
  emblaApi: EmblaCarouselType,
  eventName?: EmblaEventType,
): void => {
  const engine = emblaApi.internalEngine();
  const scrollProgress = emblaApi.scrollProgress();
  const slidesInView = emblaApi.slidesInView();
  const isScrollEvent = eventName === "scroll";

  emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress;
    const slidesInSnap = engine.slideRegistry[snapIndex];

    slidesInSnap.forEach((slideIndex) => {
      if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();

          if (slideIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target);

            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress);
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          }
        });
      }

      const translate = diffToTarget * (-1 * Factor) * 100;
      const Node = Nodes[slideIndex];
      Node.style.transform = `translateX(${translate}%)`;
    });
  });
};

export const setupParallax = (emblaApi: EmblaCarouselType): (() => void) => {
  setNodes(emblaApi);
  setFactor(emblaApi);
  Parallax(emblaApi);

  emblaApi
    .on("reInit", setNodes)
    .on("reInit", setFactor)
    .on("reInit", Parallax)
    .on("scroll", Parallax)
    .on("slideFocus", Parallax);

  return (): void => {
    Nodes.forEach((slide) => slide.removeAttribute("style"));
  };
};
