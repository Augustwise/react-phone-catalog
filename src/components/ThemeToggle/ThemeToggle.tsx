import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context';
import styles from './ThemeToggle.module.scss';

const MoonIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d={`M13.5 9.5C12.8 9.8 12 10 11.2 10C7.9 10 5.2 7.3 5.2 4C5.2 3.2 5.4 2.4 5.7 1.7C3.3 2.6 1.5 4.9 1.5 7.7C1.5 11.3 4.4 14.2 8 14.2C10.5 14.2 12.6 12.8 13.5 9.5Z`}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path
      d={`M8 1V2.5M8 13.5V15M15 8H13.5M2.5 8H1M12.95 3.05L11.9 4.1M4.1 11.9L3.05 12.95M12.95 12.95L11.9 11.9M4.1 4.1L3.05 3.05`}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const isLightTheme = theme === 'light';
  const label = isLightTheme
    ? t('header.switchToDarkTheme')
    : t('header.switchToLightTheme');

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleTheme}
      title={label}
      aria-label={label}
    >
      <span key={theme} className={styles.iconWrapper}>
        {isLightTheme ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
};
