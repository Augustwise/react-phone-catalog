import { lazy, Suspense } from 'react';
import { HeroSlider } from '../../components/HeroSlider';
import { Categories } from '../../components/Categories';
import { NewProductsSkeleton } from '../../components/NewProductsSkeleton';
import { HotPricesSkeleton } from '../../components/HotPricesSkeleton';

const NewProductsSlider = lazy(() =>
  import('../../components/NewProductsSlider').then(module => ({
    default: module.NewProductsSlider,
  })),
);

const HotPricesSlider = lazy(() =>
  import('../../components/HotPricesSlider').then(module => ({
    default: module.HotPricesSlider,
  })),
);

export const HomePage = () => (
  <div className="container">
    <HeroSlider />
    <Suspense fallback={<NewProductsSkeleton />}>
      <NewProductsSlider />
    </Suspense>
    <Categories />
    <Suspense fallback={<HotPricesSkeleton />}>
      <HotPricesSlider />
    </Suspense>
  </div>
);
