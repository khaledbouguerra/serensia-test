import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { TermSuggestComponent } from './features/term-suggest/term-suggest.component';
import { EmailCrawlerComponent } from './features/email-crolwer/email-crawler.component';

@Component({
  selector: 'app-root',
  imports: [TermSuggestComponent, EmailCrawlerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('serensia-test');
  @ViewChild('termDetails') termDetails?: ElementRef<HTMLDetailsElement>;
  @ViewChild('crawlerDetails') crawlerDetails?: ElementRef<HTMLDetailsElement>;

  openSection(which: 'term' | 'crawler') {
    const term = this.termDetails?.nativeElement;
    const crawler = this.crawlerDetails?.nativeElement;
    if (!term || !crawler) return;

    if (which === 'term') {
      term.open = true;
      crawler.open = false;
      term.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      crawler.open = true;
      term.open = false;
      crawler.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onToggle(which: 'term' | 'crawler') {
    const term = this.termDetails?.nativeElement;
    const crawler = this.crawlerDetails?.nativeElement;
    if (!term || !crawler) return;

    // Only react when a section is being opened
    if (which === 'term' && term.open) {
      crawler.open = false;
    }
    if (which === 'crawler' && crawler.open) {
      term.open = false;
    }
  }
}
