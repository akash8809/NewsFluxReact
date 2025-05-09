import { useState } from "react";
import { formatDistance } from "date-fns";
import { Article } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { SocialShare } from "./social-share";

// Article storage helper function
const storeArticleForDetail = (article: Article) => {
  try {
    localStorage.setItem('currentArticle', JSON.stringify(article));
  } catch (e) {
    console.error('Failed to store article in localStorage', e);
  }
};

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedDate = article.publishedAt 
    ? formatDistance(new Date(article.publishedAt), new Date(), { addSuffix: true })
    : 'Recently';

  const handleShareClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking the share button
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
        <Link 
          href={`/article/${encodeURIComponent(article.title)}`}
          onClick={() => storeArticleForDetail(article)}
        >
          <div className="cursor-pointer relative">
            <div className="flex flex-col md:flex-row h-full">
              {/* Image container - takes full width on mobile, 50% on desktop */}
              <div className="md:w-3/5 relative overflow-hidden">
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover min-h-[240px] md:min-h-[320px] group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"></div>
              </div>
              
              {/* Share button - absolute positioned and visible on hover */}
              <div 
                className={`absolute top-3 right-3 z-20 transition-opacity duration-200 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleShareClick}
              >
                <SocialShare 
                  article={article} 
                  variant="icon" 
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md"
                />
              </div>
              
              {/* Content container - positioned over the image on mobile, beside it on desktop */}
              <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col justify-end md:justify-center relative md:static z-10">
                <div className="absolute top-4 left-4 md:static md:mb-4">
                  <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                    Featured Story
                  </span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-white md:text-gray-900 md:dark:text-white group-hover:text-primary/90 transition-colors mt-auto md:mt-0">
                  {article.title}
                </h2>
                
                <p className="mt-2 text-white/90 md:text-gray-600 md:dark:text-gray-400 text-sm md:text-base line-clamp-3">
                  {article.description}
                </p>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-white/80 md:text-gray-500 md:dark:text-gray-400 text-xs md:text-sm">
                    <span>{article.source?.name || "News Source"}</span>
                    <span className="mx-2">•</span>
                    <span>{formattedDate}</span>
                  </div>
                  
                  {/* Show social share buttons on mobile when featured */}
                  <div 
                    className="md:hidden" 
                    onClick={handleShareClick}
                  >
                    <SocialShare 
                      article={article} 
                      variant="full" 
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="text-primary font-medium text-sm group-hover:underline flex items-center">
                    Read full article
                  </div>
                  
                  {/* Desktop social sharing */}
                  <div className="hidden md:block">
                    {isHovered && (
                      <div onClick={handleShareClick}>
                        <SocialShare 
                          article={article} 
                          variant="full" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
