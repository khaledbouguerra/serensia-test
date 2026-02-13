export interface CrawlResult {
  emails: string[];
  visitedUrls: string[];
}
export interface Node {
  url: string;
  depth: number;
}
