import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) //, { preserveWhitespaces: true }); // para preservar os espaços em brancos (nível global em tempo de exec), que o update do Angular provoca (caso dos botões juntos sem espaço)
