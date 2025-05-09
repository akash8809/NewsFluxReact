import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}

export function SearchBar({ searchQuery, setSearchQuery, handleSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim and sanitize search query
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      handleSearch();
    }
  };

  // Handle input changes and sanitize on the fly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any characters that might cause problems in search
    const sanitizedValue = e.target.value;
    setSearchQuery(sanitizedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[280px] lg:w-[320px] relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full pl-10 pr-10 py-1.5 h-9 text-sm bg-gray-100 dark:bg-gray-800/70 border-0 rounded-full focus-visible:ring-1 focus-visible:ring-primary"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm" 
            onClick={() => setSearchQuery("")}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <span className="text-xl leading-none">&times;</span>
          </Button>
        )}
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0.5 text-gray-500 hover:text-primary"
          aria-label="Search"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 13.5L10 10M11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </form>
  );
}
