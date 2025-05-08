import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RefreshButtonProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  className?: string;
}

export function RefreshButton({ onRefresh, isRefreshing, className }: RefreshButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onRefresh}
      disabled={isRefreshing}
      className={cn(
        'flex items-center space-x-1.5 rounded-full h-8 px-3 text-xs font-medium',
        'bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50',
        'border border-gray-200 dark:border-gray-700',
        'transition-all duration-200',
        isRefreshing && 'opacity-70',
        className
      )}
    >
      <RefreshCw 
        className={cn(
          'h-3.5 w-3.5', 
          isRefreshing ? 'animate-spin text-primary' : 'text-gray-500 dark:text-gray-400'
        )} 
      />
      <span className="text-gray-700 dark:text-gray-300">
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </span>
    </Button>
  );
}