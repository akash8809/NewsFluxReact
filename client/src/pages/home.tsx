import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import { ArticleCard } from "@/components/news/article-card";
import { FeaturedArticle } from "@/components/news/featured-article";
import { CategoryPills } from "@/components/news/category-pills";
import { ArticleDetailModal } from "@/components/news/article-detail-modal";
import { HeadlineSlider } from "@/components/news/headline-slider";
import { RefreshButton } from "@/components/news/refresh-button";
import { NEWS_API_ENDPOINT, CATEGORIES, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Article, NewsResponse } from "@/lib/types";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface HomeProps {
  toggleDarkMode: () => void;
}

export default function Home({ toggleDarkMode }: HomeProps) {
  const [currentCategory, setCurrentCategory] = useState<string>("general");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryParams, setQueryParams] = useState<{ category?: string; q?: string }>({ category: "general" });
  const [page, setPage] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { toast } = useToast();

  // Reset page when category or search query changes
  useEffect(() => {
    setPage(1);
  }, [currentCategory, queryParams]);

  // Query for the current category or search
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching
  } = useQuery<NewsResponse>({
    queryKey: [NEWS_API_ENDPOINT, queryParams, page],
    retry: 1,
  });

  // Separate query for top headlines (always fetch regardless of category)
  const { 
    data: headlinesData,
    refetch: refetchHeadlines 
  } = useQuery<NewsResponse>({
    queryKey: [NEWS_API_ENDPOINT, { category: "general" }],
    enabled: !searchQuery, // Only fetch headlines when not searching
  });

  // Update headlines when data is available
  useEffect(() => {
    if (headlinesData?.articles && headlinesData.articles.length > 0) {
      setHeadlines(headlinesData.articles.slice(0, 5)); // Get top 5 headlines
    }
  }, [headlinesData]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setQueryParams({ q: searchQuery.trim() });
      setCurrentCategory("");
    } else if (currentCategory) {
      setQueryParams({ category: currentCategory });
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setSearchQuery("");
    setQueryParams({ category });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetch(), refetchHeadlines()]);
      toast({
        title: "Refreshed",
        description: "The latest news has been loaded",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not load the latest news. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRetry = () => {
    refetch();
    toast({
      title: "Retrying",
      description: "Attempting to fetch news again",
    });
  };

  const handleNextPage = () => {
    if (data && data.articles.length === DEFAULT_PAGE_SIZE) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const articles = data?.articles || [];
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.length > 1 ? articles.slice(1) : [];

  // Set title based on current category or search
  useEffect(() => {
    if (searchQuery) {
      document.title = `Search: ${searchQuery} | NewsHub`;
    } else {
      const categoryLabel = CATEGORIES.find(c => c.value === currentCategory)?.label || "News";
      document.title = `${categoryLabel} | NewsHub`;
    }
  }, [currentCategory, searchQuery]);

  return (
    <>
      <Header
        toggleDarkMode={toggleDarkMode}
        currentCategory={currentCategory}
        setCurrentCategory={handleCategoryChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <main className="flex-grow container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <Sidebar currentCategory={currentCategory} setCurrentCategory={handleCategoryChange} />

        <div className="flex-grow">
          {/* Show headline slider only on home/category pages, not search */}
          {!searchQuery && headlines.length > 0 && (
            <HeadlineSlider headlines={headlines} />
          )}

          <div className="md:hidden overflow-x-auto pb-3 mb-3 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-2 whitespace-nowrap">
              <CategoryPills
                categories={CATEGORIES}
                currentCategory={currentCategory}
                setCurrentCategory={handleCategoryChange}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {searchQuery
                  ? `Search Results: ${searchQuery}`
                  : CATEGORIES.find(c => c.value === currentCategory)?.label || "News"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {searchQuery
                  ? `Latest news related to "${searchQuery}"`
                  : "The latest news from around the world"}
              </p>
            </div>
            <RefreshButton 
              onRefresh={handleRefresh} 
              isRefreshing={isRefreshing || isFetching}
            />
          </div>

          {isLoading ? (
            <>
              <div className="mb-6">
                <div className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800">
                  <div className="bg-gray-300 dark:bg-gray-700 aspect-[21/9] animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800">
                    <div className="bg-gray-300 dark:bg-gray-700 aspect-video animate-pulse"></div>
                    <div className="p-3">
                      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mb-1.5"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : isError ? (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800 dark:text-red-300">Error loading news</h3>
                  <p className="mt-1 text-red-700 dark:text-red-400">
                    {error instanceof Error ? error.message : "Unable to fetch articles. Please check your connection and try again."}
                  </p>
                  <Button 
                    onClick={handleRetry}
                    className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Try a different search term or category
              </p>
            </div>
          ) : (
            <>
              {featuredArticle && (
                <div className="mb-6">
                  <FeaturedArticle article={featuredArticle} />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {remainingArticles.map((article, index) => (
                  <ArticleCard key={`${article.title}-${index}`} article={article} />
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={page <= 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-l-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={articles.length < DEFAULT_PAGE_SIZE}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      <ArticleDetailModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
