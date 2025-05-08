import { Article } from "@/lib/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { format } from "date-fns";

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
          
          <div className="aspect-video">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{article.source?.name || "News Source"}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{article.description}</p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8">{article.content}</p>
            
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
