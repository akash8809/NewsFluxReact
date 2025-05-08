import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchNews } from "./api/news";

export async function registerRoutes(app: Express): Promise<Server> {
  // News API route
  app.get("/api/news", async (req, res) => {
    try {
      const { q, category, page, pageSize } = req.query;
      
      console.log("Received request with params:", { 
        q, category, page, pageSize 
      });
      
      const params = {
        q: q ? String(q) : undefined,
        category: category ? String(category) : undefined,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      };
      
      // Log the processed parameters
      console.log("Processed params:", params);
      
      const news = await fetchNews(params);
      
      // Log the response size
      console.log(`Returning ${news.articles.length} articles for category: ${params.category || 'none'}, query: ${params.q || 'none'}`);
      
      res.json(news);
    } catch (error) {
      console.error("Error in /api/news route:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
