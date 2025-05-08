import { Button } from "@/components/ui/button";
import { CategoryType } from "@/lib/types";

interface CategoryPillsProps {
  categories: CategoryType[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

export function CategoryPills({ categories, currentCategory, setCurrentCategory }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant="ghost"
          size="sm"
          onClick={() => setCurrentCategory(category.value)}
          className={`h-7 px-3 py-0 text-xs font-medium rounded-full transition-all duration-200 ${
            currentCategory === category.value
              ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground shadow-sm border-primary/20"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
