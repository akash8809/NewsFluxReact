import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NEWS_API_ENDPOINT } from "@/lib/constants";
import { Article as ArticleType, NewsResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function Article() {
  const [, params] = useRoute<{ id: string }>("/article/:id");
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("general");
  
  const { data, isLoading, isError } = useQuery<NewsResponse>({
    queryKey: [NEWS_API_ENDPOINT, { q: decodeURIComponent(params?.id || "") }],
    enabled: !!params?.id,
  });

  useEffect(() => {
    if (data && data.articles.length > 0) {
      setArticle(data.articles[0]);
      document.title = `${data.articles[0].title} | NewsHub`;
    }
  }, [data]);

  // Dummy function handlers for the header props
  const handleSearch = () => {};
  const toggleDarkMode = () => {};

  const formattedDate = article?.publishedAt 
    ? format(new Date(article.publishedAt), 'MMMM dd, yyyy')
    : '';

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header 
          toggleDarkMode={toggleDarkMode}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <main className="flex-grow container mx-auto px-4 py-10 flex justify-center items-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-lg">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header 
          toggleDarkMode={toggleDarkMode}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <main className="flex-grow container mx-auto px-4 py-10">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5 mb-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-300">Article not found</h3>
                <p className="mt-1 text-red-700 dark:text-red-400">
                  We couldn't find the article you're looking for. It may have been removed or doesn't exist.
                </p>
                <Button 
                  asChild
                  className="mt-3 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium"
                >
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        toggleDarkMode={toggleDarkMode}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <a className="inline-flex items-center mb-6 text-primary hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all news
            </a>
          </Link>
          
          {article.image && (
            <div className="aspect-video mb-6 rounded-xl overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{article.source?.name || "News Source"}</span>
            {formattedDate && (
              <>
                <span>•</span>
                <span>{formattedDate}</span>
              </>
            )}
            {article.author && (
              <>
                <span>•</span>
                <span>By {article.author}</span>
              </>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{article.description}</p>
          
          <div className="prose dark:prose-invert prose-lg max-w-none">
            <p>{article.content}</p>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
            >
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
              >
                Read Full Article on {article.source?.name || "Original Site"}
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
