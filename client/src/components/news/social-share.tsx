import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { Article } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  article: Article;
  variant?: 'icon' | 'full';
  className?: string;
}

export function SocialShare({ article, variant = 'icon', className = '' }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { toast } = useToast();
  
  // Constructing the article URL
  const articleUrl = `${window.location.origin}/article/${encodeURIComponent(article.title)}`;
  
  // Prepare share URLs for different platforms
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.description)}`;
  
  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = twitterShareUrl;
        break;
      case 'facebook':
        shareUrl = facebookShareUrl;
        break;
      case 'linkedin':
        shareUrl = linkedinShareUrl;
        break;
      default:
        return;
    }
    
    // Open share URL in a new window
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    // Close dialog after sharing
    setIsOpen(false);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setLinkCopied(true);
      
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard",
      });
      
      // Reset copy state after 2 seconds
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the link manually",
        variant: "destructive",
      });
    }
  };
  
  if (variant === 'icon') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 rounded-full ${className}`}
            aria-label="Share article"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share article</DialogTitle>
            <DialogDescription>
              Share this article with your friends and colleagues
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4">
            {/* Article preview */}
            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {article.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <h3 className="font-semibold line-clamp-1">{article.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{article.description}</p>
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="flex justify-between gap-2 mb-4">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/30 text-[#1DA1F2]"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2 bg-[#4267B2]/10 hover:bg-[#4267B2]/20 border-[#4267B2]/30 text-[#4267B2]"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border-[#0077B5]/30 text-[#0077B5]"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </Button>
            </div>
            
            {/* Copy link */}
            <div className="relative">
              <input
                type="text"
                value={articleUrl}
                readOnly
                className="w-full p-2 pr-12 rounded-md bg-gray-100 dark:bg-gray-800 text-sm border border-gray-300 dark:border-gray-700"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 px-2"
                onClick={copyToClipboard}
              >
                {linkCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Full variant with visible buttons
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs text-gray-500 dark:text-gray-400">Share:</span>
      <div className="flex space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2]"
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2]"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5]"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          {linkCopied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <LinkIcon className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}