import { useTranslation } from 'react-i18next';
import styles from '../NewProductsSlider/NewProductsSlider.module.scss';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

const SKELETON_ITEMS = Array(4).fill(null);

export const NewProductsSkeleton = () => {
  const { t } = useTranslation();

  return (
    <section className={`${styles.section} NewProductsSlider`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('sliders.newModels')}</h2>
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
          <ProductCardSkeleton key={`new-skeleton-${index}`} />
        ))}
      </div>
    </section>
  );
};
