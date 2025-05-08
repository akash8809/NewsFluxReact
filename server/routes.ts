import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchNews } from "./api/news";

export async function registerRoutes(app: Express): Promise<Server> {
  // News API route
  app.get("/api/news", async (req, res) => {
    try {
      const { q, category, page, pageSize } = req.query;
      
      const params = {
        q: q ? String(q) : undefined,
        category: category ? String(category) : undefined,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      };
      
      const news = await fetchNews(params);
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
