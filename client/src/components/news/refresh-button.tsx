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
      variant="outline"
      size="sm"
      onClick={onRefresh}
      disabled={isRefreshing}
      className={cn(
        'flex items-center space-x-1 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5',
        className
      )}
    >
      <RefreshCw 
        className={cn(
          'h-4 w-4 text-gray-600 dark:text-gray-400', 
          isRefreshing && 'animate-spin'
        )} 
      />
      <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
    </Button>
  );
}