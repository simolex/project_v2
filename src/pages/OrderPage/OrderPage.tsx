import { AppLink } from "../../shared/ui/AppLink";
import { Mods } from "../../shared/lib/classNames/classNames";
import { classNames } from "../../shared/lib/classNames";

import styles from "./OrderPage.module.scss";
import { Button } from "../../shared/ui/Button";

const OrderPage = (props: any) => {
    const { className, children, ...otherProps } = props;
    let uuid = self.crypto.randomUUID();
    const getRouteOrder = (id: string) => `/order/${id}`;

    return (
        <div className={classNames(styles.page, {}, [className])}>
            <AppLink to={getRouteOrder(uuid)}>
                <Button>Оформить заказ</Button>
            </AppLink>
        </div>
    );
};

export default OrderPage;
