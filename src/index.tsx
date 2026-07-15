import { createRoot, hydrateRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import './utils/i18n';
import i18n from './utils/i18n';

const root = document.getElementById('root') as HTMLElement;

const app = (
  <HashRouter>
    <App />
  </HashRouter>
);

const isHomePage = !location.hash || location.hash === '#/';
const isDefaultState =
  isHomePage &&
  i18n.language === 'en' &&
  document.documentElement.getAttribute('data-theme') !== 'dark';

if (root.hasChildNodes() && isDefaultState) {
  hydrateRoot(root, app, {
    onRecoverableError: error => {
      const message = error instanceof Error ? error.message : String(error);

      if (!message.includes('#419')) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
  });
} else {
  if (root.hasChildNodes()) {
    root.innerHTML = '';
  }

  createRoot(root).render(app);
}
