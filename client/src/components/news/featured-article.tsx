import { Article } from "@/lib/types";
import { ArticleCard } from "./article-card";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <div className="mb-8">
      <ArticleCard article={article} featured={true} />
    </div>
  );
}
