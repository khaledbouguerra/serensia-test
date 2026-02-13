import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { DefaultHtmlFetcher, HTML_FETCHER } from './core/http/html-fetcher';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTML_FETCHER, useClass: DefaultHtmlFetcher },
  ],
};
