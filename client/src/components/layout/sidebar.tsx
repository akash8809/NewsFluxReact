import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { NewspaperIcon, HashIcon, TrendingUpIcon, LightbulbIcon, DollarSignIcon, HeartIcon, TrophyIcon } from "lucide-react";

interface SidebarProps {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

// Map category values to icons
const categoryIcons: Record<string, JSX.Element> = {
  "general": <HashIcon className="h-4 w-4" />,
  "technology": <LightbulbIcon className="h-4 w-4" />,
  "business": <DollarSignIcon className="h-4 w-4" />,
  "health": <HeartIcon className="h-4 w-4" />,
  "sports": <TrophyIcon className="h-4 w-4" />,
  "entertainment": <TrendingUpIcon className="h-4 w-4" />,
  "science": <LightbulbIcon className="h-4 w-4" />
};

export function Sidebar({ currentCategory, setCurrentCategory }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <aside className={`hidden md:block ${isCollapsed ? 'w-16' : 'w-56'} flex-shrink-0 transition-all duration-300`}>
      <div className="sticky top-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header with collapse toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${isCollapsed ? 'hidden' : 'block'}`}>
            Categories
          </h2>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7" : "M11 19l-7-7 7-7"} />
            </svg>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-1">
          {CATEGORIES.map((category) => {
            const isActive = currentCategory === category.value;
            return (
              <a
                key={category.value}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentCategory(category.value);
                }}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary dark:from-primary/30 dark:to-transparent dark:text-primary-foreground font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 font-normal"
                }`}
                title={isCollapsed ? category.label : undefined}
              >
                <div className={`${isActive ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'} p-1.5 rounded-md`}>
                  {categoryIcons[category.value] || <HashIcon className="h-4 w-4" />}
                </div>
                {!isCollapsed && <span className="ml-3">{category.label}</span>}
                {!isCollapsed && isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>
                )}
              </a>
            );
          })}
        </nav>
        
        {/* Info card - only show when expanded */}
        {!isCollapsed && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-gray-800 dark:to-gray-800/80 rounded-lg p-3 text-xs">
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 dark:bg-primary/20 p-1.5 rounded-full">
                  <NewspaperIcon className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="font-medium ml-2 text-gray-900 dark:text-gray-100">NewsHub Pro Tip</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-xs">Stay updated with your favorite topics by selecting categories or using the search bar</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
