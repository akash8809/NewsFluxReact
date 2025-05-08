import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeadlineSliderProps {
  headlines: Article[];
}

export function HeadlineSlider({ headlines }: HeadlineSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === headlines.length - 1 ? 0 : prevIndex + 1
    );
  }, [headlines.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? headlines.length - 1 : prevIndex - 1
    );
  }, [headlines.length]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  if (!headlines || headlines.length === 0) {
    return null;
  }

  const headline = headlines[currentIndex];

  return (
    <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-gray-800/50 p-1">
      <div className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2">
        <Button 
          onClick={prevSlide} 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="px-12 py-4">
        <Link href={`/article/${encodeURIComponent(headline.title)}`}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center cursor-pointer">
            {headline.image && (
              <div className="w-full md:w-1/3 rounded-lg overflow-hidden aspect-video">
                <img 
                  src={headline.image} 
                  alt={headline.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="w-full md:w-2/3">
              <div className="flex items-center mb-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Top Headline
                </span>
                {headline.source?.name && (
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {headline.source?.name}
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold line-clamp-2 hover:text-primary transition-colors">
                {headline.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-3">
                {headline.description}
              </p>
            </div>
          </div>
        </Link>

        {/* Slide indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {headlines.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-4 bg-primary' 
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2">
        <Button 
          onClick={nextSlide} 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}