import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import Article from "@/pages/article";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for user preference
    return localStorage.getItem('darkMode') === 'true' || 
           (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 
           localStorage.getItem('darkMode') !== 'false');
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-200">
      <Switch>
        <Route path="/" component={() => <Home toggleDarkMode={toggleDarkMode} />} />
        <Route path="/article/:id" component={Article} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
