import { Article } from "@/lib/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { format } from "date-fns";
import { SocialShare } from "./social-share";

interface ArticleDetailModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleDetailModal({ article, isOpen, onClose }: ArticleDetailModalProps) {
  if (!article) return null;

  const formattedDate = article.publishedAt 
    ? format(new Date(article.publishedAt), 'MMMM dd, yyyy')
    : 'Recent publication';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-0 bg-white dark:bg-gray-800">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 rounded-full p-1 shadow-md"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="aspect-video relative">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Floating Share button on the image */}
            <div className="absolute bottom-4 right-4 z-10">
              <SocialShare 
                article={article} 
                variant="icon" 
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md"
              />
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{article.source?.name || "News Source"}</span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
              
              {/* Desktop social sharing */}
              <div className="hidden md:block">
                <SocialShare 
                  article={article} 
                  variant="full" 
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{article.description}</p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8">{article.content}</p>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
              >
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  Read Full Article
                </a>
              </Button>
              
              {/* Mobile social sharing */}
              <div className="md:hidden">
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:border-0 sm:pt-0">
                  <p className="text-sm font-medium mb-2">Share this article:</p>
                  <SocialShare 
                    article={article} 
                    variant="full" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
