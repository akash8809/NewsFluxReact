import { Article } from "@/lib/types";
import { Link } from "wouter";
import { formatDistance } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = article.publishedAt 
    ? formatDistance(new Date(article.publishedAt), new Date(), { addSuffix: true })
    : 'Recently';

  return (
    <Link href={`/article/${encodeURIComponent(article.title)}`}>
      <div className="block group cursor-pointer h-full">
        <Card className="rounded-lg overflow-hidden shadow-sm article-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 h-full flex flex-col">
          <div className="relative aspect-video">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            )}
            {featured && article.source && (
              <div className="absolute top-2 left-2">
                <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  Breaking
                </span>
              </div>
            )}
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
            <div className="mt-2 text-primary text-xs font-medium group-hover:underline flex items-center">
              Read more
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
