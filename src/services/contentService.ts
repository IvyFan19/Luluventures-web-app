export class ContentService {
  private static cache = new Map<string, string>();

  static async fetchMarkdownContent(contentUrl: string): Promise<string> {
    if (!contentUrl) {
      throw new Error('Content URL is required');
    }

    // Check cache first
    if (this.cache.has(contentUrl)) {
      return this.cache.get(contentUrl)!;
    }

    // Transform S3 URLs to use CloudFront distribution
    const transformedUrl = this.transformS3Url(contentUrl);

    try {
      const response = await fetch(transformedUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'text/markdown, text/plain, */*',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
      }

      const content = await response.text();
      
      if (!content.trim()) {
        throw new Error('Content is empty');
      }

      // Cache the content
      this.cache.set(contentUrl, content);
      
      return content;
    } catch (error) {
      console.error('Error fetching markdown content:', error);
      
      // If CORS error, provide helpful error message
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to load content due to CORS policy. The S3 bucket needs to be configured to allow requests from this domain.');
      }
      
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }

  static transformS3Url(url: string): string {
    // For now, return the URL as-is since the S3 URLs are directly accessible
    // If CORS issues persist, we might need to set up a proxy or configure S3 CORS
    return url;
  }

  static validateMarkdownUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      // Check if it's a valid HTTP/HTTPS URL
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  static clearCache(): void {
    this.cache.clear();
  }

  static getCacheSize(): number {
    return this.cache.size;
  }
}