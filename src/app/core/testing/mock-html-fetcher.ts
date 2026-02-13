import type { HtmlFetcher } from '../http/html-fetcher';

export function createMockHtmlFetcher(pages: Record<string, string>): HtmlFetcher {
  return {
    fetch: async (url: string) => {
      if (!(url in pages)) throw new Error(`404 mock: ${url}`);
      return pages[url];
    },
  };
}
