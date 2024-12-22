import { Suspense } from "react";
import { classNames } from "../../lib/classNames";
import { Modal } from "../Modal";
import { CarFormLazy } from "../CarForm/CarForm.lazy";

interface CarModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CarModal = (props: CarModalProps) => {
    const { isOpen, onClose } = props;
    return (
        <Modal className={classNames("", {}, [])} isOpen={isOpen} onClose={onClose} lazy>
            <Suspense fallback={"Загрузка..."}>
                <CarFormLazy onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
