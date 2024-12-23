import { memo, useCallback, useState } from "react";

import { classNames } from "../../lib/classNames";
import { Input } from "../../ui/Input";
import { Text, TextVariant } from "../../ui/Text";
import { Button, ButtonTheme } from "../../ui/Button";

import styles from "./CarForm.module.scss";

export interface CarFormProps {
    className?: string;
    onSuccess: () => void;
}

const CarForm = memo((props: CarFormProps) => {
    const { className, onSuccess } = props;

    const [car, setCar] = useState("");
    const [disabled, setDisabled] = useState(false);

    const onChangeCar = useCallback(
        (car: string) => {
            setCar(car);
        },
        [car]
    );
    const onSendClick = useCallback(async () => {
        setDisabled(true);
        try {
            const tg = await fetch(
                "https://api.telegram.org/bot7612955325:AAGj3znmNsefZxJNEl4PZGcU2xxzJ6vxlzA/sendMessage",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: 235593505,
                        text: `Need Car: ${car}`,
                    }),
                }
            );
            const res_tg = await tg.json();
            onSuccess();
        } catch (error) {
            console.error("POST request failed:", error);
        }
    }, [car, onSuccess]);

    return (
        <div className={classNames(styles.carForm, {}, [className])}>
            <Text title={"Выберете машину"} />
            <Input
                placeholder={"Какой автомобиль?"}
                className={classNames(styles.input)}
                type='text'
                onChange={onChangeCar}
                value={car}
                autoFocus
            />

            <Button
                className={classNames(styles.carBtn)}
                theme={ButtonTheme.OUTLINE}
                onClick={onSendClick}
                disabled={disabled}
            >
                {"Отправить"}
            </Button>
        </div>
    );
});

export default CarForm;
