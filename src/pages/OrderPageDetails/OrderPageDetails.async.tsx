import { lazy } from "react";

export const OrderPageDetailsAsync = lazy(
    () =>
        new Promise((resolve) =>
            setTimeout(
                //@ts-ignore
                () => resolve(import("./OrderPageDetails")),
                300
            )
        )
);
