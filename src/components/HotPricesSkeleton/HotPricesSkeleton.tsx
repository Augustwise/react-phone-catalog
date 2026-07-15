import { useTranslation } from 'react-i18next';
import styles from '../HotPricesSlider/HotPricesSlider.module.scss';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

const SKELETON_ITEMS = Array(4).fill(null);

export const HotPricesSkeleton = () => {
  const { t } = useTranslation();

  return (
    <section className={`${styles.section} HotPricesSlider`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('sliders.hotPrices')}</h2>
        <div className={styles.navigation}>
          <button type="button" className={styles.navButton} disabled>
            <img src="img/arrow_left.svg" alt={t('sliders.leftAlt')} />
          </button>
          <button type="button" className={styles.navButton} disabled>
            <img src="img/arrow_right.svg" alt={t('sliders.rightAlt')} />
          </button>
        </div>
      </div>
      <div className={styles.skeletonRow}>
        {SKELETON_ITEMS.map((_, index) => (
          <ProductCardSkeleton key={`hot-skeleton-${index}`} />
        ))}
      </div>
    </section>
  );
};
