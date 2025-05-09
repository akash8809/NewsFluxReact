import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Article storage helper function
const storeArticleForDetail = (article: Article) => {
  try {
    localStorage.setItem('currentArticle', JSON.stringify(article));
  } catch (e) {
    console.error('Failed to store article in localStorage', e);
  }
};

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
    <div className="relative rounded-lg overflow-hidden mb-6 shadow-sm border border-gray-200 dark:border-gray-700 group max-w-full">
      {/* Slide counter */}
      <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-full">
        <span>{currentIndex + 1}</span>
        <span className="mx-1 opacity-60">/</span>
        <span>{Math.min(headlines.length, 5)}</span>
      </div>
      
      {/* Navigation buttons - hidden by default, visible on hover */}
      <div className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button 
          onClick={prevSlide} 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-md hover:bg-primary/10 hover:text-primary"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Slide content with fixed maximum height */}
      <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-gray-900/30 dark:to-transparent">
        <Link 
          href={`/article/${encodeURIComponent(headline.title)}`}
          onClick={() => storeArticleForDetail(headline)}
        >
          <div className="flex flex-col md:flex-row items-stretch cursor-pointer group/article h-full">
            {/* Image container with fixed dimensions */}
            {headline.image && (
              <div className="md:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10 md:hidden"></div>
                <img 
                  src={headline.image} 
                  alt={headline.title}
                  className="w-full h-full object-cover min-h-[180px] max-h-[250px] md:max-h-[280px] group-hover/article:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback for image loading errors
                    e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/94a3b8?text=No+Image";
                  }}
                />
                {/* Mobile title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 md:hidden">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                      Latest
                    </span>
                    {headline.source?.name && (
                      <span className="text-xs text-white/90 truncate max-w-[150px]">
                        {headline.source?.name}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base md:text-lg font-bold line-clamp-2 text-white">
                    {headline.title}
                  </h2>
                </div>
              </div>
            )}
            
            {/* Content container - desktop view with text-overflow handling */}
            <div className="hidden md:flex md:w-3/5 p-4 md:p-5 flex-col justify-center overflow-hidden">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                  Top Story
                </span>
                {headline.source?.name && (
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {headline.source?.name}
                  </span>
                )}
              </div>
              
              <h2 className="text-lg font-bold line-clamp-2 group-hover/article:text-primary transition-colors">
                {headline.title}
              </h2>
              
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 overflow-hidden">
                {headline.description}
              </p>
              
              <div className="mt-3 text-primary text-xs font-medium flex items-center space-x-1.5 group-hover/article:translate-x-1 transition-transform duration-200">
                <span>Read full article</span>
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Mobile content - below image, with fixed height */}
            <div className="md:hidden p-4 max-h-[100px] overflow-hidden">
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {headline.description}
              </p>
              <div className="mt-2 text-primary text-xs font-medium flex items-center space-x-1">
                <span>Read more</span>
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Slide indicators with limited count */}
        <div className="absolute bottom-3 left-0 right-0 z-20">
          <div className="flex justify-center space-x-1.5">
            {headlines.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 bg-primary' 
                    : 'w-1.5 bg-gray-300/80 dark:bg-gray-600/80 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Next button - hidden by default, visible on hover */}
      <div className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button 
          onClick={nextSlide} 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-md hover:bg-primary/10 hover:text-primary"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}