import { ReactNode, useMemo, useState } from "react";

import { AppContext, OrderKey } from "../../theme/ThemeContext";
import { LOCAL_STORAGE_ORDER_KEY, TELEGRAM_TOKEN } from "../../const/localStorage";

const defaultKey = (localStorage.getItem(LOCAL_STORAGE_ORDER_KEY) as OrderKey) || "";

interface AppProviderProps {
    initialKey?: OrderKey;
    children: ReactNode;
}

const AppProvider = (props: AppProviderProps) => {
    const { children, initialKey } = props;

    const [isCarModal, setIsCarModal] = useState(false);
    const [orderKey, setOrderKey] = useState<OrderKey>(initialKey || defaultKey);

    const waitJoin = async (lastUpdate: number) => {
        const response = await fetch(`https://api.telegram.org/${TELEGRAM_TOKEN}/getUpdates`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ offset: lastUpdate + 1, allowed_updates: ["callback_query"], timeout: 30 })
        });
    };

    const defaultProps = useMemo(
        () => ({
            orderKey,
            setOrderKey,
            isCarModal,
            setIsCarModal,
            waitJoin
        }),
        [orderKey, isCarModal]
    );

    // document.body.className = theme;

    return <AppContext.Provider value={defaultProps}>{children}</AppContext.Provider>;
};

export default AppProvider;
