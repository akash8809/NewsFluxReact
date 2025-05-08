import { Link } from "wouter";
import { NewspaperIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <NewspaperIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">NewsHub</span>
          </div>
          <div className="text-sm text-center md:text-right text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} NewsHub - A modern news aggregator</p>
            <p className="mt-1">
              Powered by GNews | 
              <Link href="/terms"><span className="text-primary hover:underline ml-1 cursor-pointer">Terms</span></Link> | 
              <Link href="/privacy"><span className="text-primary hover:underline ml-1 cursor-pointer">Privacy</span></Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
