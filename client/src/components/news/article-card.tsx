import { useState } from "react";
import { Article } from "@/lib/types";
import { Link, useLocation } from "wouter";
import { formatDistance } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { SocialShare } from "./social-share";

// Article storage helper function
const storeArticleForDetail = (article: Article) => {
  try {
    localStorage.setItem('currentArticle', JSON.stringify(article));
  } catch (e) {
    console.error('Failed to store article in localStorage', e);
  }
};

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
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
      className="block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="rounded-lg overflow-hidden shadow-sm article-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 h-full flex flex-col group relative">
        <Link 
          href={`/article/${encodeURIComponent(article.title)}`}
          onClick={() => storeArticleForDetail(article)}
        >
          <div className="cursor-pointer">
            <div className="relative aspect-video overflow-hidden">
              {article.image && (
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              {featured && article.source && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                    Breaking
                  </span>
                </div>
              )}
              
              {/* Share button - visible on hover */}
              <div 
                className={`absolute top-2 right-2 z-10 transition-opacity duration-200 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleShareClick}
              >
                <SocialShare 
                  article={article} 
                  variant="icon" 
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                <div className="flex items-center space-x-1">
                  <span className="text-white/90 text-xs">{article.source?.name || "News Source"}</span>
                  <span className="text-white/80 text-xs">•</span>
                  <span className="text-white/80 text-xs">{formattedDate}</span>
                </div>
              </div>
            </div>
            <CardContent className={`${featured ? "p-4" : "p-3"} flex-grow flex flex-col`}>
              <h2 className={`${featured ? "text-lg sm:text-xl" : "text-base"} font-semibold group-hover:text-primary transition-colors line-clamp-2`}>
                {article.title}
              </h2>
              <p className={`${featured ? "mt-2" : "mt-1.5"} text-sm text-gray-600 dark:text-gray-400 ${featured ? "line-clamp-3" : "line-clamp-2"} flex-grow`}>
                {article.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="text-primary text-xs font-medium group-hover:underline flex items-center">
                  Read more
                </div>
                {/* Only show on featured cards or when hovered */}
                {(featured || isHovered) && (
                  <div 
                    className="md:hidden" 
                    onClick={handleShareClick}
                  >
                    <SocialShare 
                      article={article} 
                      variant="full" 
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Link>
      </Card>
    </div>
  );
}
