export interface TermSuggestion {
  term: string;
  score: number; // nb de remplacements min
  lengthDelta: number; // |term.length - search.length|
}
