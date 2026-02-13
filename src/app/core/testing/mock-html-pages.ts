export const MOCK_BASE = 'http://localhost/';

export const MOCK_URLS = {
  index: `${MOCK_BASE}TestHtml/index.html`,
  child1: `${MOCK_BASE}TestHtml/child1.html`,
  child2: `${MOCK_BASE}TestHtml/child2.html`,
  abs: `${MOCK_BASE}absolute.html`,
} as const;

export const MOCK_PAGES: Record<string, string> = {
  [MOCK_URLS.index]: `
    <!doctype html><html><body>
      <h1>INDEX</h1>

      <a href="child1.html">child1</a>
      <a href="mailto:nullepart@mozilla.org">Envoyer l'email nulle part</a>

      <!-- ignored -->
      <a href="#section">hash</a>
      <a href="javascript:alert(1)">js</a>
      <a href="">empty</a>

      <!-- absolute link -->
      <a href="${MOCK_URLS.abs}">abs</a>
    </body></html>
  `,
  [MOCK_URLS.child1]: `
    <!doctype html><html><body>
      <h1>CHILD1</h1>

      <a href="index.html">index</a>
      <a href="child2.html">child2</a>

      <a href="mailto:ailleurs@mozilla.org">Envoyer l'email ailleurs</a>
      <a href="mailto:nullepart@mozilla.org">Envoyer l'email nulle part</a>
    </body></html>
  `,
  [MOCK_URLS.child2]: `
    <!doctype html><html><body>
      <h1>CHILD2</h1>

      <a href="index.html">index</a>

      <a href="mailto:loin@mozilla.org?subject=hi">Envoyer l'email loin</a>
      <a href="mailto:">empty mailto</a>

      <!-- bad url that should be caught by URL() -->
      <a href="http://[bad-url">bad</a>
    </body></html>
  `,
  [MOCK_URLS.abs]: `
    <!doctype html><html><body>
      <h1>ABS</h1>
      <a href="mailto:absolute@mozilla.org">abs mail</a>
    </body></html>
  `,
};
