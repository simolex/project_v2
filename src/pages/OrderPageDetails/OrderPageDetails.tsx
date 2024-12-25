import { Button } from "../../shared/ui/Button";
import { classNames } from "../../shared/lib/classNames";

import styles from "./OrderPageDetails.module.scss";
import { Text } from "../../shared/ui/Text";
import { Input } from "../../shared/ui/Input";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../theme/ThemeContext";
import { TELEGRAM_CHAT_ID, TELEGRAM_TOKEN } from "../../const/localStorage";

interface OrderPageDetailsProps {
    className?: string;
}

const OrderPageDetails = (props: OrderPageDetailsProps) => {
    const { className } = props;
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { waitJoin, setOrderKey, telegramToken, telegramChatId } = useContext(AppContext);
    const navigate = useNavigate();

    // const waitCar = ()

    const { id: OrderId } = useParams<{ id: string }>();

    useEffect(() => {
        OrderId && setOrderKey(OrderId);
    }, []);

    const onChangeUsername = useCallback(
        (username: string) => {
            setUsername(username);
        },
        [username]
    );
    const onChangePhone = useCallback(
        (phone: string) => {
            setPhone(phone);
        },
        [phone]
    );

    const onSendClick = useCallback(async () => {
        setDisabled(true);
        try {
            const firstUpdate = await fetch(
                `https://api.telegram.org/bot${telegramToken}/getUpdates`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ allowed_updates: ["callback_query"] }),
                }
            );
            const jF = await firstUpdate.json();
            let lastUpdate = 0;
            for (const update of jF.result) {
                // console.log(lastUpdate, update);
                lastUpdate = Math.max(lastUpdate, update.update_id);
            }

            const tg = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: telegramChatId,
                    text: `Имя: ${username}\nТелефон: ${phone}`,
                    reply_markup: {
                        inline_keyboard: [[{ text: "Принять заказ", callback_data: `${OrderId}` }]],
                    },
                }),
            });

            waitJoin(lastUpdate, OrderId);
            setTimeout(() => {
                navigate("/order");
            }, 900);
        } catch (error) {
            console.error("POST request failed:", error);
        }
    }, [username, phone]);

    return (
        <div className={classNames(styles.page, {}, [className])}>
            <div className={classNames(styles.form, {}, [className])}>
                <Text title={"Форма регистрации"} />
                {/* {error && <Text title={t("error")} text={error} variant={TextVariant.ERROR} />} */}
                <Input
                    placeholder={"Имя пользователя"}
                    className={classNames(styles.input)}
                    type='text'
                    onChange={onChangeUsername}
                    value={username}
                    autoFocus
                />
                <Input
                    placeholder={"Номер телефона"}
                    className={classNames(styles.input)}
                    type='text'
                    onChange={onChangePhone}
                    value={phone}
                />
                <Button
                    className={classNames(styles.loginBtn)}
                    onClick={onSendClick}
                    disabled={disabled}
                >
                    {"Отправить"}
                </Button>
            </div>
        </div>
    );
};

export default OrderPageDetails;
