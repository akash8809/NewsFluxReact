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
      <a className="block group">
        <Card className="rounded-xl overflow-hidden shadow-md article-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
          <div className="relative aspect-video">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            )}
            {featured && article.source && (
              <div className="absolute top-3 left-3">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Breaking
                </span>
              </div>
            )}
          </div>
          <CardContent className={featured ? "p-5" : "p-4"}>
            <h2 className={`${featured ? "text-xl sm:text-2xl" : "text-lg"} font-bold group-hover:text-primary transition-colors`}>
              {article.title}
            </h2>
            <p className={`${featured ? "mt-2" : "mt-2 text-sm"} text-gray-600 dark:text-gray-400 ${!featured && "line-clamp-3"}`}>
              {article.description}
            </p>
            <div className={`${featured ? "mt-4" : "mt-3"} flex justify-between items-center ${!featured && "text-sm"}`}>
              <div className="text-gray-500 dark:text-gray-400">
                <span>{article.source?.name || "News Source"}</span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
              <span className="text-primary font-medium group-hover:underline">Read more</span>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
