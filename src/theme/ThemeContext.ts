import { createContext } from "react";

export type Theme = "light" | "dark";

export type OrderKey = string | null

export interface AppContentPros {
    isCarModal?: boolean;
    setIsCarModal?: (isCar: boolean) => void;
    waitJoin?: (offset: number) => void;
}

export const AppContext = createContext<AppContentPros>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';