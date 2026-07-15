import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import uaFlag from 'flag-icons/flags/4x3/ua.svg';
import usFlag from 'flag-icons/flags/4x3/us.svg';
import styles from './LanguageSelect.module.scss';

type Language = 'en' | 'ua';

type Props = {
  value: Language;
  onChange: (value: Language) => void;
};

const LANGUAGES = [
  { value: 'ua' as Language, label: 'Ukrainian', flag: uaFlag },
  { value: 'en' as Language, label: 'English', flag: usFlag },
];

export const LanguageSelect = ({ value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    LANGUAGES.find(lang => lang.value === value) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as Node;
      const isClickedInside = rootRef.current?.contains(clickedElement);

      if (!isClickedInside) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleSelectLanguage = (selectedLanguage: Language) => {
    onChange(selectedLanguage);
    setIsOpen(false);
  };

  const isLanguageSelected = (language: Language) => {
    return language === value;
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggleMenu}
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.label}
          className={styles.flag}
          data-no-dark-filter="true"
        />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {LANGUAGES.map(language => {
            const isSelected = isLanguageSelected(language.value);

            return (
              <button
                key={language.value}
                type="button"
                className={classNames(styles.option, {
                  [styles.optionActive]: isSelected,
                })}
                onClick={() => handleSelectLanguage(language.value)}
              >
                <img
                  src={language.flag}
                  alt={language.label}
                  className={styles.flag}
                  data-no-dark-filter="true"
                />
                <span className={styles.optionLabel}>{language.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
