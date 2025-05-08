import { Button } from "@/components/ui/button";
import { CategoryType } from "@/lib/types";

interface CategoryPillsProps {
  categories: CategoryType[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

export function CategoryPills({ categories, currentCategory, setCurrentCategory }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={currentCategory === category.value ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentCategory(category.value)}
          className={`px-3 py-1 text-sm rounded-full ${
            currentCategory === category.value
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
