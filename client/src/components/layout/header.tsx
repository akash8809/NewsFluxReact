import { useState } from "react";
import { Link } from "wouter";
import { NewspaperIcon, MenuIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchBar } from "@/components/news/search-bar";
import { CategoryPills } from "@/components/news/category-pills";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";

interface HeaderProps {
  toggleDarkMode: () => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}

export function Header({
  toggleDarkMode,
  currentCategory,
  setCurrentCategory,
  searchQuery,
  setSearchQuery,
  handleSearch
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full sm:w-auto mb-3 sm:mb-0">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-1.5 rounded-md group-hover:shadow-md transition-all duration-200">
                <NewspaperIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NewsHub
              </h1>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMobileMenu}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="ml-1 text-sm">Menu</span>
          </Button>
        </div>
        
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />
        
        <div className="hidden sm:flex items-center space-x-2">
          <ThemeToggle toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pb-2 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-3 space-y-2">
            <p className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">Categories</p>
            <CategoryPills 
              categories={CATEGORIES}
              currentCategory={currentCategory}
              setCurrentCategory={(category) => {
                setCurrentCategory(category);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dark Mode</span>
              <ThemeToggle toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
