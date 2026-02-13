import { TestBed } from '@angular/core/testing';
import { EmailCrawlerService } from './email-crawler.service';
import { HTML_FETCHER } from '../../core/http/html-fetcher';
import { createMockHtmlFetcher } from '../../core/testing/mock-html-fetcher';
import { MOCK_PAGES, MOCK_URLS } from '../../core/testing/mock-html-pages';

describe('EmailCrawlerService', () => {
  function setup() {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: HTML_FETCHER, useValue: createMockHtmlFetcher(MOCK_PAGES) }],
    });
    return TestBed.inject(EmailCrawlerService);
  }

  it('returns empty result when start URL is invalid (normalizeUrl fails)', async () => {
    const svc = setup();
    const res = await svc.crawl('not-a-valid-url', 1);
    expect(res).toEqual({ emails: [], visitedUrls: [] });
  });

  it('maximumDepth=0 crawls only the start page (does not visit children)', async () => {
    const svc = setup();
    const res = await svc.crawl(MOCK_URLS.index, 0);

    expect(res.emails).toEqual(['nullepart@mozilla.org']);
    expect(res.visitedUrls).toEqual([MOCK_URLS.index]);
  });

  it('maximumDepth=1 crawls start page + direct children (BFS), not deeper pages', async () => {
    const svc = setup();
    const res = await svc.crawl(MOCK_URLS.index, 1);

    expect(res.emails).toEqual(
      ['absolute@mozilla.org', 'ailleurs@mozilla.org', 'nullepart@mozilla.org'].sort(),
    );

    expect(res.visitedUrls).toEqual(
      expect.arrayContaining([MOCK_URLS.index, MOCK_URLS.child1, MOCK_URLS.abs]),
    );
    expect(res.visitedUrls).not.toContain(MOCK_URLS.child2);
  });

  it('maximumDepth=2 crawls 2 levels deep (includes child2)', async () => {
    const svc = setup();
    const res = await svc.crawl(MOCK_URLS.index, 2);

    expect(res.emails).toEqual(
      [
        'absolute@mozilla.org',
        'ailleurs@mozilla.org',
        'loin@mozilla.org',
        'nullepart@mozilla.org',
      ].sort(),
    );

    expect(res.visitedUrls).toEqual(
      expect.arrayContaining([MOCK_URLS.index, MOCK_URLS.child1, MOCK_URLS.child2, MOCK_URLS.abs]),
    );
  });

  it('maximumDepth=-1 crawls all reachable pages (unlimited)', async () => {
    const svc = setup();
    const res = await svc.crawl(MOCK_URLS.index, -1);

    expect(res.emails).toEqual(
      [
        'absolute@mozilla.org',
        'ailleurs@mozilla.org',
        'loin@mozilla.org',
        'nullepart@mozilla.org',
      ].sort(),
    );

    expect(res.visitedUrls).toEqual(
      expect.arrayContaining([MOCK_URLS.index, MOCK_URLS.child1, MOCK_URLS.child2, MOCK_URLS.abs]),
    );
  });

  it('deduplicates emails across pages and normalizes to lowercase', async () => {
    const svc = setup();
    const res = await svc.crawl(MOCK_URLS.index, -1);

    const nullepartCount = res.emails.filter((e) => e === 'nullepart@mozilla.org').length;
    expect(nullepartCount).toBe(1);

    expect(res.emails.every((e) => e === e.toLowerCase())).toBe(true);
  });

  it('does not loop infinitely on cycles (index <-> child1 <-> child2 -> index)', async () => {
    const svc = setup();
    const res = await svc.crawl(MOCK_URLS.index, -1);

    // sanity: cycle should not explode
    expect(res.visitedUrls.length).toBeLessThanOrEqual(10);
    expect(res.visitedUrls).toEqual(
      expect.arrayContaining([MOCK_URLS.index, MOCK_URLS.child1, MOCK_URLS.child2]),
    );
  });
});
