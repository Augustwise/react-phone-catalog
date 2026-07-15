import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import './utils/i18n';

export const render = () =>
  renderToString(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
