import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

const PhonesPage = lazy(() =>
  import('./pages/PhonesPage').then(module => ({
    default: module.PhonesPage,
  })),
);

const TabletsPage = lazy(() =>
  import('./pages/TabletsPage').then(module => ({
    default: module.TabletsPage,
  })),
);

const AccessoriesPage = lazy(() =>
  import('./pages/AccessoriesPage').then(module => ({
    default: module.AccessoriesPage,
  })),
);

const FavoritesPage = lazy(() =>
  import('./pages/FavoritesPage').then(module => ({
    default: module.FavoritesPage,
  })),
);

const CartPage = lazy(() =>
  import('./pages/CartPage').then(module => ({
    default: module.CartPage,
  })),
);

const ProductDetailsPage = lazy(() =>
  import('./pages/ProductDetailsPage').then(module => ({
    default: module.ProductDetailsPage,
  })),
);

const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then(module => ({
    default: module.NotFoundPage,
  })),
);

export const App = () => (
  <ThemeProvider>
    <FavoritesProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <main className="section">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/phones" element={<PhonesPage />} />
                <Route path="/tablets" element={<TabletsPage />} />
                <Route path="/accessories" element={<AccessoriesPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </FavoritesProvider>
  </ThemeProvider>
);
