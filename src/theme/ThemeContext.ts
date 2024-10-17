import { createContext } from "react";

export type Theme = "light" | "dark";

export const ThemeContext = createContext({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';