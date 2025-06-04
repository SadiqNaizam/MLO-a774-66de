import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example usage of shadcn Card
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CarouselSlide {
  id: string | number;
  imageUrl: string;
  altText: string;
  content?: React.ReactNode; // Optional content overlay
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  aspectRatio?: number; // e.g., 16/9 or 3/1 for hero banners
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
  aspectRatio = 16 / 9,
}) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with", slides.length, "slides.");

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full bg-muted flex items-center justify-center p-8" style={{aspectRatio: `${aspectRatio}`}}>
        <p className="text-muted-foreground">No slides to display.</p>
      </div>
    );
  }

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
            <Card className="m-0 border-0 shadow-none rounded-none"> {/* Minimalist card */}
              <CardContent className="p-0 relative">
                <AspectRatio ratio={aspectRatio}>
                  <img
                    src={slide.imageUrl || '/placeholder.svg'}
                    alt={slide.altText}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                  />
                </AspectRatio>
                {slide.content && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4">
                    {slide.content}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Consider adding Prev/Next buttons and Dots for better UX if needed */}
    </div>
  );
};
export default Carousel;