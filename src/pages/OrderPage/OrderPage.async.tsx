import { lazy } from "react";

export const OrderPageAsync = lazy(
    () =>
        new Promise((resolve) =>
            setTimeout(
                //@ts-ignore
                () => resolve(import("./OrderPage")),
                300
            )
        )
);
