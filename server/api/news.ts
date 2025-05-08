import axios from 'axios';
import { Article, NewsApiParams, NewsResponse } from '@/lib/types';

// GNews API base URL
const BASE_URL = 'https://gnews.io/api/v4';

// Default parameters
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_LANGUAGE = 'en';

// Fetch news from GNews API
export async function fetchNews(params: NewsApiParams): Promise<NewsResponse> {
  try {
    const apiKey = process.env.GNEWS_API_KEY || '';
    
    if (!apiKey) {
      throw new Error('GNEWS_API_KEY environment variable is not set');
    }

    const queryParams = new URLSearchParams({
      apikey: apiKey,
      lang: DEFAULT_LANGUAGE,
      max: String(params.pageSize || DEFAULT_PAGE_SIZE),
    });

    // Add page number if provided
    if (params.page) {
      queryParams.append('page', String(params.page));
    }

    // Decide the endpoint based on parameters
    let endpoint = `${BASE_URL}/top-headlines`;
    
    // Add query parameter if provided
    if (params.q) {
      queryParams.append('q', params.q);
      endpoint = `${BASE_URL}/search`;
    }

    // Add category parameter if provided and no query is set
    if (params.category) {
      // For debugging
      console.log(`Using category: ${params.category}`);
      
      if (params.category !== 'general') {
        queryParams.append('category', params.category);
      }
      
      // If we're doing a category search, make sure we're using the top-headlines endpoint
      if (!params.q) {
        endpoint = `${BASE_URL}/top-headlines`;
      }
    }

    const response = await axios.get(`${endpoint}?${queryParams.toString()}`);
    
    const data = response.data;
    
    // Normalize the response to match our expected format
    return {
      totalArticles: data.totalArticles || 0,
      articles: data.articles.map((article: any) => ({
        source: {
          id: null,
          name: article.source.name,
        },
        author: article.author || null,
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        content: article.content,
        publishedAt: article.publishedAt,
      })),
    };
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`News API error: ${error.response.status} - ${error.response.data.error || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from News API. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
