import { createContext } from "react";
import { TelegramChatIdType, TelegramTokenType } from "../const/localStorage";

export type Theme = "light" | "dark";

export type OrderKey = string | null;

export interface AppContentPros {
    telegramToken?: TelegramTokenType;
    telegramChatId?: TelegramChatIdType;
    isCarModal?: boolean;
    setIsCarModal?: (isCar: boolean) => void;
    orderKey?: string;
    setOrderKey?: (key: string) => void;
    waitJoin?: (offset: number, key: string) => void;
}

export const AppContext = createContext<AppContentPros>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
