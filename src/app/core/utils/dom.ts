import { parseMailto } from './url';

// EXACT same logic as parsePage() in your service (moved only)
export function parsePage(
  baseUrl: string,
  html: string,
): { pageEmails: string[]; links: string[] } {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const anchors = Array.from(doc.querySelectorAll('a[href]'));
  const emails: string[] = [];
  const links: string[] = [];

  for (const a of anchors) {
    const href = (a.getAttribute('href') || '').trim();
    if (!href) continue;

    if (href.toLowerCase().startsWith('mailto:')) {
      const email = parseMailto(href);
      if (email) emails.push(email);
      continue;
    }

    // ignore hash-only and javascript links
    if (href.startsWith('#')) continue;
    if (href.toLowerCase().startsWith('javascript:')) continue;

    links.push(href);
  }

  return { pageEmails: emails, links };
}
