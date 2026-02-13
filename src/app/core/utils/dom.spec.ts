import { parsePage } from './dom';

describe('core/utils/dom.ts (parsePage)', () => {
  it('extracts mailto emails and normal links', () => {
    const html = `
      <!doctype html><html><body>
        <a href="mailto:a@mozilla.org">A</a>
        <a href="child1.html">child</a>
      </body></html>
    `;

    const res = parsePage('http://example.com/index.html', html);

    expect(res.pageEmails).toEqual(['a@mozilla.org']);
    expect(res.links).toEqual(['child1.html']);
  });

  it('ignores empty hrefs, hash links and javascript links', () => {
    const html = `
      <html><body>
        <a href="">empty</a>
        <a href="#section">hash</a>
        <a href="javascript:alert(1)">js</a>
        <a href="mailto:nullepart@mozilla.org">mail</a>
      </body></html>
    `;

    const res = parsePage('http://example.com/index.html', html);

    expect(res.pageEmails).toEqual(['nullepart@mozilla.org']);
    expect(res.links).toEqual([]); // all ignored
  });

  it('keeps non-mailto links even if relative, and ignores empty mailto result', () => {
    const html = `
      <html><body>
        <a href="mailto:">empty mailto</a>
        <a href="mailto:?subject=hi">empty mailto2</a>
        <a href="./child2.html">child2</a>
      </body></html>
    `;

    const res = parsePage('http://example.com/index.html', html);

    expect(res.pageEmails).toEqual([]); // parseMailto returns null
    expect(res.links).toEqual(['./child2.html']);
  });
});
