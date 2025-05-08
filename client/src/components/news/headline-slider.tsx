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
    <div className="relative rounded-lg overflow-hidden mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2">
        <Button 
          onClick={prevSlide} 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Slide content */}
      <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-gray-900/30 dark:to-transparent">
        <Link href={`/article/${encodeURIComponent(headline.title)}`}>
          <div className="flex flex-col md:flex-row items-stretch cursor-pointer group">
            {/* Image container */}
            {headline.image && (
              <div className="md:w-2/5 overflow-hidden">
                <img 
                  src={headline.image} 
                  alt={headline.title}
                  className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            
            {/* Content container */}
            <div className="md:w-3/5 p-4 md:p-6 flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  Latest
                </span>
                {headline.source?.name && (
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {headline.source?.name}
                  </span>
                )}
              </div>
              
              <h2 className="text-lg md:text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                {headline.title}
              </h2>
              
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {headline.description}
              </p>
              
              <div className="mt-3 text-primary text-xs font-medium group-hover:underline flex items-center">
                Read full article
              </div>
            </div>
          </div>
        </Link>

        {/* Slide indicators */}
        <div className="absolute bottom-3 left-0 right-0">
          <div className="flex justify-center space-x-1.5">
            {headlines.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-6 bg-primary' 
                    : 'w-1.5 bg-gray-300/80 dark:bg-gray-600/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Next button */}
      <div className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2">
        <Button 
          onClick={nextSlide} 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}