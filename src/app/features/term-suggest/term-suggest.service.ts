import { Injectable } from '@angular/core';
import { TermSuggestion } from './term-suggest.models';

@Injectable({ providedIn: 'root' })
export class TermSuggestService {
  score(term: string, search: string): number {
    if (!search) return 0;
    if (term.length < search.length) return Number.POSITIVE_INFINITY;

    let best = Number.POSITIVE_INFINITY;

    for (let start = 0; start <= term.length - search.length; start++) {
      let diff = 0;

      for (let i = 0; i < search.length; i++) {
        if (term[start + i] !== search[i]) diff++;
        if (diff >= best) break; // early exit
      }

      if (diff < best) best = diff;
      if (best === 0) return 0;
    }

    return best;
  }

  /**
   * 1) score asc
   * 2) length closeness to search => abs(len diff) asc
   * 3) alphabetical asc
   */
  suggest(search: string, terms: string[], limit?: number): string[] {
    const s = search ?? '';
    const items: TermSuggestion[] = [];

    for (const t of terms ?? []) {
      const sc = this.score(t, s);
      if (Number.isFinite(sc)) {
        items.push({
          term: t,
          score: sc,
          lengthDelta: Math.abs(t.length - s.length),
        });
      }
    }

    items.sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      if (a.lengthDelta !== b.lengthDelta) return a.lengthDelta - b.lengthDelta;
      return a.term.localeCompare(b.term);
    });

    const res = items.map((x) => x.term);
    return typeof limit === 'number' ? res.slice(0, Math.max(0, limit)) : res;
  }
}
