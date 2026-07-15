import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = 'theme';

const getInitialTheme = (): Theme => {
  if (typeof localStorage === 'undefined') {
    return 'light';
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  return savedTheme === 'dark' ? 'dark' : 'light';
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';

        const applyTheme = () => {
          flushSync(() => {
            document.documentElement.setAttribute('data-theme', nextTheme);
            setTheme(nextTheme);
          });
        };

        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;

        if (
          typeof document.startViewTransition === 'function' &&
          !prefersReducedMotion
        ) {
          document.startViewTransition(applyTheme);
        } else {
          applyTheme();
        }
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
