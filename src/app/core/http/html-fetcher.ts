import { InjectionToken } from '@angular/core';

export interface HtmlFetcher {
  fetch(url: string): Promise<string>;
}

export const HTML_FETCHER = new InjectionToken<HtmlFetcher>('HTML_FETCHER');

export class DefaultHtmlFetcher implements HtmlFetcher {
  async fetch(url: string): Promise<string> {
    const res = await fetch(url);
    return await res.text();
  }
}
