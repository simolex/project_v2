import { MouseEvent, ReactNode } from "react";

import { classNames } from "../../lib/classNames";
import { Mods } from "../../lib/classNames/classNames";
import { useModal } from "../../lib/hooks/useModal/useModal";
import { Portal } from "../../ui/Portal";
import { Overlay } from "../../ui/Overlay";
import styles from "./Modal.module.scss";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;

    const {
        isClosing,
        isMounted,
        close: closeHandler
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen,
        onClose
    });

    const onContentClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.modal, mods, [className])}>
                <Overlay onClick={closeHandler} />
                <div className={styles.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
