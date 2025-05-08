import { CATEGORIES } from "@/lib/constants";

interface SidebarProps {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

export function Sidebar({ currentCategory, setCurrentCategory }: SidebarProps) {
  return (
    <aside className="hidden md:block w-56 flex-shrink-0">
      <div className="sticky top-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Categories
        </h2>
        <nav className="space-y-1">
          {CATEGORIES.map((category) => (
            <a
              key={category.value}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentCategory(category.value);
              }}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${
                currentCategory === category.value
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 font-normal"
              }`}
            >
              <span className={`mr-2 w-1.5 h-1.5 rounded-full ${currentCategory === category.value ? 'bg-primary' : 'bg-gray-400 dark:bg-gray-600'}`}></span>
              {category.label}
            </a>
          ))}
        </nav>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800/80 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1.5">Stay updated</p>
            <p>Select a category to filter news or use the search bar to find specific topics</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
