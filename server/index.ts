import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Limit log length
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Register routes for your API
  const server = await registerRoutes(app);

  // Global error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Unhandled Error:", err);

    // Send error response
    res.status(status).json({ message });
    throw err; // Throw error for further debugging if needed
  });

  // Vite setup only in development environment
  if (app.get("env") === "development") {
    await setupVite(app, server); // Set up Vite for development (hot reload, etc.)
  } else {
    serveStatic(app); // Serve static files in production
  }

  // Always serve the app on port 5000 (can be modified for production)
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0", // Listen on all network interfaces
    reusePort: true, // Reuse the same port for multiple connections
  }, () => {
    log(`Server is serving on port ${port}`);
  });
})();
