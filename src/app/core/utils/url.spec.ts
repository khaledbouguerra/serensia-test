import { normalizeUrl, parseMailto, resolveUrl } from './url';

describe('core/utils/url.ts', () => {
  describe('normalizeUrl()', () => {
    it('returns normalized absolute url', () => {
      expect(normalizeUrl('http://example.com/a')).toBe('http://example.com/a');
    });

    it('returns normalized absolute url (adds trailing slash when needed)', () => {
      // new URL('http://example.com') becomes 'http://example.com/'
      expect(normalizeUrl('http://example.com')).toBe('http://example.com/');
    });

    it('returns null when invalid', () => {
      expect(normalizeUrl('not-a-url')).toBeNull();
      expect(normalizeUrl('')).toBeNull(); // will throw in URL() and return null
    });
  });

  describe('resolveUrl()', () => {
    it('resolves relative href against base', () => {
      const base = 'http://example.com/TestHtml/index.html';
      expect(resolveUrl(base, 'child1.html')).toBe('http://example.com/TestHtml/child1.html');
    });

    it('keeps absolute href', () => {
      const base = 'http://example.com/TestHtml/index.html';
      expect(resolveUrl(base, 'http://a.test/x')).toBe('http://a.test/x');
    });

    it('returns null when URL constructor throws', () => {
      const base = 'http://example.com/TestHtml/index.html';
      expect(resolveUrl(base, 'http://[bad-url')).toBeNull();
    });
  });

  describe('parseMailto()', () => {
    it('extracts email and lowercases it', () => {
      expect(parseMailto('mailto:TEST@MOZILLA.ORG')).toBe('test@mozilla.org');
    });

    it('removes query string', () => {
      expect(parseMailto('mailto:loin@mozilla.org?subject=hi')).toBe('loin@mozilla.org');
    });

    it('returns null when empty mailto address', () => {
      expect(parseMailto('mailto:')).toBeNull();
      expect(parseMailto('mailto:?subject=x')).toBeNull();
    });
  });
});
