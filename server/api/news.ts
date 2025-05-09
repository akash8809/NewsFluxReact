import axios from 'axios';
import { Article, NewsApiParams, NewsResponse } from '@/lib/types';

// News API base URL
const BASE_URL = 'https://newsapi.org/v2';

// Default parameters
const DEFAULT_PAGE_SIZE = 10;

// Fetch news from News API
export async function fetchNews(params: NewsApiParams): Promise<NewsResponse> {
  try {
    const apiKey = process.env.NEWS_API_KEY || '';
    
    if (!apiKey) {
      throw new Error('NEWS_API_KEY environment variable is not set');
    }

    // Basic query parameters
    const queryParams: Record<string, string> = {
      apiKey: apiKey,
      pageSize: String(params.pageSize || DEFAULT_PAGE_SIZE),
      language: 'en',
    };

    // Add page number if provided (Note: News API uses page, not offset)
    if (params.page) {
      queryParams.page = String(params.page);
    }

    // Determine the endpoint based on query parameters
    let endpoint = `${BASE_URL}/top-headlines`;
    
    // Handle search query if provided
    if (params.q) {
      const encodedQuery = encodeURIComponent(params.q);
      queryParams.q = encodedQuery;
      // For free tier, use /everything endpoint for search
      endpoint = `${BASE_URL}/everything`;
      console.log(`Searching for query: ${encodedQuery}`);
    } 
    // If no search query but category is provided, use category for top-headlines
    else if (params.category) {
      console.log(`Using category: ${params.category}`);
      
      // Top-headlines requires either country or sources or category
      queryParams.country = 'us'; // Default to US news
      
      // Only add category if it's not 'general' (general is default)
      if (params.category !== 'general') {
        queryParams.category = params.category;
      }
    } 
    // Default case - top headlines for country
    else {
      queryParams.country = 'us';
      console.log('Returning top headlines for US');
    }

    // Convert query params to URL search params
    const searchParams = new URLSearchParams(queryParams);
    
    // Make the API request
    const response = await axios.get(`${endpoint}?${searchParams.toString()}`);
    const data = response.data;
    
    if (data.status !== 'ok') {
      throw new Error(`API returned status: ${data.status} - ${data.message || 'Unknown error'}`);
    }
    
    // Normalize the response to match our expected format
    // Note: News API uses urlToImage, we map it to image to match our interface
    return {
      totalArticles: data.totalResults || 0,
      articles: data.articles.map((article: any) => ({
        source: {
          id: article.source?.id || null,
          name: article.source?.name || 'Unknown Source',
        },
        author: article.author || null,
        title: article.title || 'Untitled Article',
        description: article.description || 'No description available',
        url: article.url || '#',
        // Map urlToImage to image
        image: article.urlToImage || null,
        // News API has content limited to 200 chars, use description as fallback
        content: article.content || article.description || 'No content available',
        publishedAt: article.publishedAt || new Date().toISOString(),
      })),
    };
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Response Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      
      throw new Error(`News API error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Network Error:', error.request);
      throw new Error('No response from News API. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Setup Error:', error.message);
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
