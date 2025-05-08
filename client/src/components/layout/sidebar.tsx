import { CATEGORIES } from "@/lib/constants";

interface SidebarProps {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

export function Sidebar({ currentCategory, setCurrentCategory }: SidebarProps) {
  return (
    <aside className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-24 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <nav className="space-y-2">
          {CATEGORIES.map((category) => (
            <a
              key={category.value}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentCategory(category.value);
              }}
              className={`block px-3 py-2 rounded-lg font-medium ${
                currentCategory === category.value
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
