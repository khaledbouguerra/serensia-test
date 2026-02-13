import { inject, Injectable } from '@angular/core';
import { CrawlResult, Node } from './email-crawler.models';
import { HTML_FETCHER, HtmlFetcher } from '../../core/http/html-fetcher';
import { normalizeUrl, resolveUrl } from '../../core/utils/url';
import { parsePage } from '../../core/utils/dom';

@Injectable({ providedIn: 'root' })
export class EmailCrawlerService {
  private readonly fetcher = inject<HtmlFetcher>(HTML_FETCHER);

  async crawl(startUrl: string, maximumDepth: number): Promise<CrawlResult> {
    const start = normalizeUrl(startUrl);
    if (!start) return { emails: [], visitedUrls: [] };

    const visited = new Set<string>();
    const emails = new Set<string>();

    const q: Node[] = [{ url: start, depth: 0 }];

    while (q.length) {
      const { url, depth } = q.shift()!;

      if (visited.has(url)) continue;
      visited.add(url);

      // depth rule: 0 means only start page (depth==0). 1 includes children (depth<=1).
      // -1 means unlimited
      if (maximumDepth !== -1 && depth > maximumDepth) continue;

      const html = await this.fetcher.fetch(url);
      const { pageEmails, links } = parsePage(url, html);

      for (const e of pageEmails) emails.add(e);

      // If we already are at max depth, don't enqueue children
      if (maximumDepth !== -1 && depth === maximumDepth) continue;

      for (const link of links) {
        const resolved = resolveUrl(url, link);
        if (!resolved) continue;
        if (!visited.has(resolved)) {
          q.push({ url: resolved, depth: depth + 1 });
        }
      }
    }

    return {
      emails: Array.from(emails).sort((a, b) => a.localeCompare(b)),
      visitedUrls: Array.from(visited),
    };
  }
}
