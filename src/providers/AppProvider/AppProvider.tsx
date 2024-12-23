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
    const [orderKey, setOrderKey] = useState(initialKey || defaultKey);

    const waitJoin = async (lastUpdate: number, ordKey: string) => {
        let count = 10;
        const send = async (lastUpdate: number, ordKey: string): Promise<any> => {
            return fetch(`https://api.telegram.org/${TELEGRAM_TOKEN}/getUpdates`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    offset: lastUpdate,
                    allowed_updates: ["callback_query"],
                    timeout: 30,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((resp) => {
                    if (
                        resp &&
                        resp.result.some((result: any) => result.callback_query.data === ordKey)
                    ) {
                        setIsCarModal(true);
                    } else if (resp.result.length > 0 && count-- > 0) {
                        for (const update of resp.result) {
                            //Выбераем последнее событие
                            lastUpdate = Math.max(lastUpdate, update.update_id);
                        }
                        return send(lastUpdate + 1, ordKey);
                    } else {
                        return send(lastUpdate, ordKey);
                    }
                })
                .catch(() => send(lastUpdate, ordKey));
        };
        return send(lastUpdate, ordKey);
    };

    const defaultProps = useMemo(
        () => ({
            orderKey,
            setOrderKey,
            isCarModal,
            setIsCarModal,
            waitJoin,
        }),
        [orderKey, isCarModal]
    );

    return <AppContext.Provider value={defaultProps}>{children}</AppContext.Provider>;
};

export default AppProvider;
