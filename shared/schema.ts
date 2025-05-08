import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sources = pgTable("sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id").references(() => sources.id),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  url: text("url").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at"),
  author: text("author"),
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSourceSchema = createInsertSchema(sources).pick({
  name: true,
  url: true,
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  sourceId: true,
  title: true,
  description: true,
  content: true,
  url: true,
  imageUrl: true,
  publishedAt: true,
  author: true,
  isFavorite: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSource = z.infer<typeof insertSourceSchema>;
export type Source = typeof sources.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
