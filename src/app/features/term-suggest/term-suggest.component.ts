import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermSuggestService } from './term-suggest.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-term-suggest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './term-suggest.component.html',
  styleUrls: ['./term-suggest.component.scss'],
})
export class TermSuggestComponent {
  private readonly svc = inject(TermSuggestService);
  // UI state (signals)
  search = signal('gros');
  termsRaw = signal(
    `gros
agressif
gras
groo
grosx`,
  );
  limit = signal<number>(10);

  // derived
  terms = computed(() =>
    this.termsRaw()
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean),
  );

  results = computed(() => this.svc.suggest(this.search().trim(), this.terms(), this.limit()));

  fillExample() {
    this.search.set('gros');
    this.termsRaw.set(
      `gros
agressif
gras
groo
grosx`,
    );
    this.limit.set(10);
  }

  clear() {
    this.search.set('');
    this.termsRaw.set('');
  }

  setLimitFromInput(value: string) {
    const n = parseInt(value, 10);
    this.limit.set(Number.isFinite(n) ? n : 0);
  }
}
