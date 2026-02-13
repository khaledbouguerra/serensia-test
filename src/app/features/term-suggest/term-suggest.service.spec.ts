import { TestBed } from '@angular/core/testing';
import { TermSuggestService } from './term-suggest.service';

describe('TermSuggestService', () => {
  let service: TermSuggestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermSuggestService);
  });

  it('returns Infinity if term is shorter than search', () => {
    expect(service.score('abc', 'abcd')).toBe(Number.POSITIVE_INFINITY);
  });

  it('computes min replacements against any substring (no insertions)', () => {
    expect(service.score('agressif', 'gros')).toBe(1);

    // exact match => 0
    expect(service.score('gros', 'gros')).toBe(0);
  });

  it('sorts by score, then length closeness, then alphabetical', () => {
    const terms = [
      'agressif', // score 1 vs "gros"
      'gros', // score 0
      'gras', // score 1 (g r a s vs g r o s -> 1)
      'groo', // score 1 (last char)
      'grosx', // score 0 possible? substring "gros" => 0, but lengthDelta=1
    ];

    const res = service.suggest('gros', terms);

    // Score 0 first: "gros" then "grosx" (same score 0, but lengthDelta 0 wins)
    expect(res[0]).toBe('gros');
    expect(res[1]).toBe('grosx');

    // Among score=1 and lengthDelta=0: "gras" vs "groo" => alphabetical
    const idxGras = res.indexOf('gras');
    const idxGroo = res.indexOf('groo');
    expect(idxGras).toBeGreaterThan(-1);
    expect(idxGroo).toBeGreaterThan(-1);
    expect(idxGras).toBeLessThan(idxGroo);
  });

  it('supports limit', () => {
    const res = service.suggest('gros', ['gros', 'agressif', 'gras', 'groo'], 2);
    expect(res.length).toBe(2);
    expect(res[0]).toBe('gros');
  });
});
