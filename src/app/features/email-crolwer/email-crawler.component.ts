import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailCrawlerService } from './email-crawler.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-email-crawler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-crawler.component.html',
  styleUrls: ['./email-crawler.component.scss'],
})
export class EmailCrawlerComponent {
  private readonly svc = inject(EmailCrawlerService);

  url = signal('http://localhost:4200/TestHtml/index.html');
  depth = signal<number>(1);
  loading = signal(false);
  error = signal<string | null>(null);
  emails = signal<string[]>([]);
  visited = signal<string[]>([]);

  setDepthFromInput(value: string) {
    const n = parseInt(value, 10);
    this.depth.set(Number.isFinite(n) ? n : 0);
  }

  async run() {
    this.loading.set(true);
    this.error.set(null);
    this.emails.set([]);
    this.visited.set([]);

    try {
      const res = await this.svc.crawl(this.url().trim(), this.depth());
      this.emails.set(res.emails);
      this.visited.set(res.visitedUrls);
      //@typescript-eslint/no-explicit-any
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.loading.set(false);
    }
  }
}
