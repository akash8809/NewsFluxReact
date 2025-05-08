import { formatDistance } from "date-fns";
import { Article } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const formattedDate = article.publishedAt 
    ? formatDistance(new Date(article.publishedAt), new Date(), { addSuffix: true })
    : 'Recently';

  return (
    <Link href={`/article/${encodeURIComponent(article.title)}`}>
      <Card className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
        <div className="relative">
          <div className="flex flex-col md:flex-row h-full">
            {/* Image container - takes full width on mobile, 50% on desktop */}
            <div className="md:w-3/5 relative">
              {article.image && (
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover min-h-[240px] md:min-h-[320px]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"></div>
            </div>
            
            {/* Content container - positioned over the image on mobile, beside it on desktop */}
            <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col justify-end md:justify-center relative md:static z-10">
              <div className="absolute top-4 left-4 md:static md:mb-4">
                <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  Breaking News
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-white md:text-gray-900 md:dark:text-white group-hover:text-primary/90 transition-colors mt-auto md:mt-0">
                {article.title}
              </h2>
              
              <p className="mt-2 text-white/90 md:text-gray-600 md:dark:text-gray-400 text-sm md:text-base line-clamp-3">
                {article.description}
              </p>
              
              <div className="mt-3 flex items-center text-white/80 md:text-gray-500 md:dark:text-gray-400 text-xs md:text-sm">
                <span>{article.source?.name || "News Source"}</span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
              
              <div className="mt-3 text-primary font-medium text-sm group-hover:underline">
                Read full article
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
