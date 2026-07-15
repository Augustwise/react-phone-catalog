import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './HeroSlider.module.scss';

const slides = [
  {
    id: 1,
    image: 'img/phones/apple-iphone-14-pro/spaceblack/01.webp',
    width: 545,
    height: 545,
  },
  {
    id: 2,
    image: 'img/tablets/apple-ipad-pro-11-2021/spacegray/01.webp',
    width: 474,
    height: 526,
  },
  {
    id: 3,
    image: 'img/accessories/apple-watch-series-6/space-gray/00.webp',
    width: 514,
    height: 485,
  },
];

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 40;

export const HeroSlider = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex(current =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex(current => (current + 1) % slides.length);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;

    touchStartX.current = null;

    if (deltaX > SWIPE_THRESHOLD) {
      handlePrev();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      handleNext();
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <h1 className={styles.title}>{t('hero.title')}</h1>

      <div className={styles.sliderWrapper}>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
          >
            <img
              src="img/arrow_left.svg"
              alt={t('hero.prevAlt')}
              data-no-dark-filter="true"
            />
          </button>
        </div>

        <div
          className={styles.viewport}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.track}
            style={{
              transform: `translateX(calc(${activeIndex} * (-100% - 16px)))`,
            }}
          >
            {slides.map((slide, index) => (
              <div className={styles.slide} key={slide.id}>
                <div className={styles.slideContent}>
                  <div className={styles.slideLeft}>
                    <div className={styles.textContent}>
                      <h2 className={styles.slideTitle}>
                        {t('hero.slideTitle')}
                        <span className={styles.emoji}></span>
                      </h2>
                      <p className={styles.slideSubtitle}>
                        {t('hero.slideSubtitle')}
                      </p>
                      <a href="#" className={styles.orderButton}>
                        {t('hero.orderNow')}
                      </a>
                    </div>
                  </div>
                  <div className={styles.slideRight}>
                    <img
                      src={slide.image}
                      alt={t('hero.productAlt')}
                      className={styles.slideImage}
                      width={slide.width}
                      height={slide.height}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      {...({
                        fetchpriority: index === 0 ? 'high' : 'low',
                      } as Record<string, string>)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNext}
          >
            <img
              src="img/arrow_right.svg"
              alt={t('hero.nextAlt')}
              data-no-dark-filter="true"
            />
          </button>
        </div>
      </div>

      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={classNames(styles.paginationDot, {
              [styles.isActive]: index === activeIndex,
            })}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
