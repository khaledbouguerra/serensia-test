export function parseMailto(href: string): string | null {
  // mailto:contact@serensia.com?subject=Hello
  const raw = href.slice('mailto:'.length);
  const emailPart = raw.split('?')[0].trim();
  if (!emailPart) return null;
  return emailPart.toLowerCase();
}

export function resolveUrl(base: string, href: string): string | null {
  try {
    // supports relative + absolute
    const u = new URL(href, base);
    return u.toString();
  } catch {
    return null;
  }
}

export function normalizeUrl(url: string): string | null {
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}
