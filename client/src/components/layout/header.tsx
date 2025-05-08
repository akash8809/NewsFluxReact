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
    <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full sm:w-auto mb-3 sm:mb-0">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <NewspaperIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">NewsHub</h1>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden text-gray-600 dark:text-gray-300"
            onClick={toggleMobileMenu}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
        
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />
        
        <ThemeToggle toggleDarkMode={toggleDarkMode} />
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</p>
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
